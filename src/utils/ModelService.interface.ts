export interface ModelService<T> {
    create(entity: T): Promise<T>;

    delete(id: number): Promise<void>;

    findAll(): Promise<Array<T> | null>;

    findByPk(id: number): Promise<T | null>;

    search?(query: string): Promise<Array<T> | null>;

    update(entity: T): Promise<T | null>;
}
