export * from './lib';

try {
    // @ts-expect-error no type
    console.error("Snapit test");
} catch (e) {
}