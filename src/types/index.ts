// filepath: /c:/Users/camil/Documents/GitHub/AmigoDoLeao/src/types/index.ts
export interface User {
    id: string;
    email: string;
    password: string;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
}

export interface Module {
    id: string;
    title: string;
    courses: Course[];
}