export type Id = string | number
export type Tasks = {
    id: string;
    content: string;
};
export type column = {
    id: Id;
    title: string;
    tasks: Tasks[];

}