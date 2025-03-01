export interface ImagickConfig {
    imagickPath?: string;
    srcPath?: string | null;
    dstPath?: string | null;
    srcFormat?: string | null;
    dstFormat?: string | null;
    options?: {
        width?: number;
        height?: number;
    };
}