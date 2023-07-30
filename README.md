React folder structure I used for this project:

kebab-case for file name and directories

name of components be like -> FROM MyComponent.tsx TO my-component.tsx
name of directories be like -> FROM postList TO post-list

in common components go to src/components
API go to src/api
layouts go to src/layouts
containers go to src/containers
global contexts go to src/context
global hooks go to src/hooks
global routes go to src/types
global utils go to src/utils
routes go to src/routes

assets go to src/assets and placed each related assets base on pages
pages go to src/pages/pages-folder/pages-name.tsx

components & hooks & contexts & types & utils & containers & layouts that are only used for a specific page
placed in that page folder like:
src/pages/pages-folder/components/component-name.tsx
src/pages/pages-folder/hooks/hook-name.ts
...
