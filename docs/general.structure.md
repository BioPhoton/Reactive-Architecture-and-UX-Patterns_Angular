# Workspace Folder:

Following workspace structure is assumed:

**Root structure**
```
├── root
│   ├── ...
│   ├── docs
│   │   ├── assetc
│   │   │   ├── images
│   │   │   │   ├── img1.png    
│   │   │   │   └── img2.png    
│   │   │   └── overview.md    
│   ├── angular.json
│   └── package.json    
│
└───src
│   ├── app.component.ts    
│   ├── app.menu.ts    
│   ├── app.routes.ts 
│   └─── app.module.ts 
│   
└───projects
    ├── episode-1
    │   ├── src
    │   │   ├── lib
    │   │   ├── docs
    │   │   │   ├── assets
    │   │   │   │   └── images
    │   │   │   │        ├── img1.png    
    │   │   │   │        └── img2.png    
    │   │   │   └── episode-1.overview.md
    │   │   ├── exercises
    │   │   │   ├── session-1
    │   │   │   │   ├── docs
    │   │   │   │   │   ├── assets
    │   │   │   │   │   │   └── images
    │   │   │   │   │   │       ├── img1.png    
    │   │   │   │   │   │       └── img2.png    
    │   │   │   │   │   ├── session-1.tyeory.md
    │   │   │   │   │   ├── session-1.exercise.md
    │   │   │   │   │   └── session-1.solution.md
    │   │   │   └── session-[n]
    │   │   ├── episode-1.component.ts  
    │   │   ├── episode-1.menu.ts    
    │   │   ├── episode-1.routes.ts 
    │   │   └── episode-1.module.ts  

```
# Episode Structure:

Following episode details are assumed:

**episode-one structure**

```
libs
└───episode-one
│   │   README.md
│   │   ...
│   └───src
│       └───lib
│          │         index.ts
│          │         episode-one.routes.ts
│          │         episode-one.module.ts
│          │         episode-one.menu.ts
│          │         …
│          └───exercise
│          │            episode-one.theory.md
│          │            episode-one.exercise.md
│          │            episode-one.solution.md
│          │            episode-one.exercise.component.ts
│          │            episode-one.solution.component.ts
│          │            …
│          └───assets
│                    │    slides.pdf
│                    │    episode-one.theory.mp4
│                    │    episode-one.exercise.mp4
│                    │    episode-one.solution.mp4 
│                    │    …
│                    └───images
│                                 image-one.png
│                                 image-two.png
│                                 …
└───episode-two
└───episode-three
└───...
```

## `exercise` folder

### `episode-one.theory.ts`

# Course/Series Structure:

Following course/series details are assumed:

**course-one structure**

```
apps
└───course-one
│   │   README.md
│   │   ...
│   └───src
│       └───app
│          │   app.module.ts
│          │   app.routes.ts
│          │   app.menu.ts
│          │   app.component.ts
│          │   ...
│          └───assets
│             course-one.heading.png
│             …
└───course-two
└───course-three
└───...
```

TODO:
Content für ersten 3 Kapitel (bis einschließlich Top 10 Operatoren)



