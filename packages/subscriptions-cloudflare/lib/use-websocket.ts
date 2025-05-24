import {
	CloseCode,
	type ConnectionAckMessage,
	type ConnectionInitMessage,
	GRAPHQL_TRANSPORT_WS_PROTOCOL,
	type Message,
	MessageType,
	type PingMessage,
	type PongMessage,
	parseMessage,
	type SubscribeMessage,
	stringifyMessage,
} from 'graphql-ws';

const CONNECTION_INIT_TIMEOUT = 5000;

const pingMessage = stringifyMessage({ type: MessageType.Ping });

function createMessage<T extends MessageType>(type: T, payload?: Record<string, unknown>) {
	if (payload) {
		return { type, payload };
	}
	return { type };
}

export function useWebsocket(
	socket: WebSocket,
	protocol: string | false,
	createSubscription: (message: SubscribeMessage) => Promise<void>,
	deleteSubscription: (id: string) => Promise<void>,
	deleteSubscriptions: () => Promise<void>,
) {
	socket.accept();

	let connectionInitReceived = false;

	let pongTimeout: number | null = null;

	const connectionTimeout = setTimeout(() => {
		socket.close(CloseCode.ConnectionInitialisationTimeout, 'Connection timeout');
	}, CONNECTION_INIT_TIMEOUT);

	const pinger = setInterval(() => ping(), 12000);

	const ping = () => {
		if (socket.readyState !== WebSocket.READY_STATE_OPEN) {
			return;
		}

		socket.send(pingMessage);

		pongTimeout = setTimeout(() => {
			socket.close(CloseCode.ConnectionAcknowledgementTimeout, 'Pong timeout');
		}, 6000);
	};

	const handleClose = () => {
		clearInterval(pinger);
		clearTimeout(pongTimeout);
		clearTimeout(connectionTimeout);
		deleteSubscriptions();
	};

	if (protocol !== GRAPHQL_TRANSPORT_WS_PROTOCOL) {
		socket.close(CloseCode.SubprotocolNotAcceptable, 'Unsupported protocol');
		handleClose();
		return;
	}

	const handleInit = (message: ConnectionInitMessage) => {
		if (connectionInitReceived) {
			return socket.close(
				CloseCode.TooManyInitialisationRequests,
				'Too many initialisations requests',
			);
		}

		clearTimeout(connectionTimeout);
		connectionInitReceived = true;

		const response: ConnectionAckMessage = createMessage(
			MessageType.ConnectionAck,
			message.payload,
		);

		return socket.send(stringifyMessage(response));
	};

	const handlePing = (message: PingMessage) => {
		const response: PongMessage = createMessage(MessageType.Pong, message.payload);
		return socket.send(stringifyMessage(response));
	};

	const handlePong = () => {
		clearTimeout(pongTimeout);
	};

	const handleEvent = async (event: MessageEvent) => {
		const dataStr = event.data.toString();

		let data: Message;

		try {
			data = parseMessage(dataStr);
		} catch {
			return socket.close(CloseCode.BadRequest, 'Invalid message received');
		}

		if (data.type === MessageType.Subscribe) {
			return await createSubscription(data);
		}

		if (data.type === MessageType.Complete) {
			return await deleteSubscription(data.id);
		}

		if (data.type === MessageType.ConnectionInit) {
			return handleInit(data);
		}

		if (data.type === MessageType.Ping) {
			return handlePing(data);
		}

		if (data.type === MessageType.Pong) {
			return handlePong();
		}
	};

	socket.addEventListener('close', handleClose);

	socket.addEventListener('message', (ev) => {
		handleEvent(ev).catch(() => {
			socket.close(1011, 'Internal error');
		});
	});
}
