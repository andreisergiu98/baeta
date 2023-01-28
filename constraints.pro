% This rule will enforce that all packages must have homepage defined
gen_enforced_field(WorkspaceCwd, 'homepage', 'https://github.com/andreisergiu98/baeta#readme').

% This rule will enforce that all packages must have bugs url defined
gen_enforced_field(WorkspaceCwd, 'bugs.url', 'https://github.com/andreisergiu98/baeta/issues').

% This rule will enforce that all packages must have the author defined
gen_enforced_field(WorkspaceCwd, 'author', 'Andrei Pampu <pampu.andrei@pm.me>').

% This rule will enforce that all packages must have repository defined
gen_enforced_field(WorkspaceCwd, 'repository.type', 'git').
gen_enforced_field(WorkspaceCwd, 'repository.url', 'https://github.com/andreisergiu98/baeta.git').
gen_enforced_field(WorkspaceCwd, 'repository.directory', WorkspaceCwd).

% This rule will prevent workspaces from depending on non-workspace versions of available workspaces
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, 'workspace:^', DependencyType) :-
    % Iterates over all dependencies from all workspaces
      workspace_has_dependency(WorkspaceCwd, DependencyIdent, DependencyRange, DependencyType),
    % Only consider those that target something that could be a workspace
      workspace_ident(DependencyCwd, DependencyIdent).

% This rule will enforce that all packages must have a "MIT" license field
gen_enforced_field(WorkspaceCwd, 'license', 'MIT').

% This rule will enforce that all packages must have an correct engines.node field
gen_enforced_field(WorkspaceCwd, 'engines.node', '>=18.0.0') :-
  workspace(WorkspaceCwd),
  % Private packages aren't covered
    \+ workspace_field_test(WorkspaceCwd, 'private', 'true').

% This rule will enforce that all packages must have the correct build scripts
gen_enforced_field(WorkspaceCwd, 'scripts.build', 'tsup') :-
  workspace(WorkspaceCwd),
  % Private packages aren't covered
    \+ workspace_field_test(WorkspaceCwd, 'private', 'true').

gen_enforced_field(WorkspaceCwd, 'scripts.types', 'tsc --noEmit') :-
  workspace(WorkspaceCwd),
  % Private packages aren't covered
    \+ workspace_field_test(WorkspaceCwd, 'private', 'true').

gen_enforced_field(WorkspaceCwd, 'scripts.prepack', 'prep') :-
  workspace(WorkspaceCwd),
  % Private packages aren't covered
    \+ workspace_field_test(WorkspaceCwd, 'private', 'true').

gen_enforced_field(WorkspaceCwd, 'scripts.postpack', 'prep --clean') :-
  workspace(WorkspaceCwd),
  % Private packages aren't covered
    \+ workspace_field_test(WorkspaceCwd, 'private', 'true').

gen_enforced_field(WorkspaceCwd, 'type', 'module') :-
  workspace(WorkspaceCwd),
  % Example requires cjs to load .ts files
    \+ workspace_ident(WorkspaceCwd, '@baeta/examples-apollo').
