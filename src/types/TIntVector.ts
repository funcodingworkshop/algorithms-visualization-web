export declare class TIntVector {
    push_back(_dNewValue: number): void;
    resize(_iNewSize: number, _dInitialValue: number): void;
    clear(): void;
    size(): number;
    capacity(): number;
    get(_iIndex: number): number;
    set(_iIndex: number, _dValue: number): void;
    insertAt(_iIndex: number, _dValue: number): void;
    removeAt(_iIndex: number): void;
    removeRange(_iIndex: number, _iCount: number): void;
    delete(): void;
}