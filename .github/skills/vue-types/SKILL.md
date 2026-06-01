---
name: vue-types
user-invocable: true
description: "Extract TypeScript interfaces from Vue components into dedicated workspace type files and keep component scripts focused on implementation."
---

# Vue type extraction

Use this skill when refactoring or creating Vue components that contain TypeScript `interface` or type definitions in `<script setup lang=\"ts\">`.

## What this skill does

- Detects `interface`, `type`, and other type-only declarations inside a Vue SFC.
- Moves all such type declarations into a dedicated workspace type file.
- Keeps the Vue component focused on template and implementation logic.
- Imports the extracted types back into the component.

## Placement rule

- All extracted types must go to `#file:types` based on the Vue file name.
- For `KeywordSphere.vue`, the target file should be `resources/js/types/keywordSphere.ts`.
- Use the component base name converted to lower camel case for the type filename.

## Workflow

1. Identify the Vue component file name and base name.
2. Extract all `interface` and type-only declarations from the component script.
3. Create or update `resources/js/types/<componentBaseName>.ts`.
4. Export the extracted types from that file.
5. Replace the original inline type declarations in the Vue component with imports from the new type file.
6. Preserve any runtime code, template markup, and component-local constants in the Vue file.

## Best practices

- If the component already uses a central `types` folder, add the new file there rather than creating a separate folder.
- Use named exports for each type.
- If a type declaration is shared across multiple components, consider moving it to a more generic shared file, but still prefer the component-specific `resources/js/types/<componentName>.ts` file first.
- Do not leave stale inline interface declarations in the component after extraction.

## Helpful reminders

- The target type file should be addressed in code as `@/types/<componentBaseName>` when possible.
- Always preserve type names and shape when moving them.
- Keep the extraction minimal: only types belong in `resources/js/types/*`, not component logic or runtime state.
