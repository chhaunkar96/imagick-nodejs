import { execSync } from 'child_process';
import { ImagickConfig } from '../types';


/**
 * Convert image using ImageMagick.
 */

/**
 * @type {import('execa').Command}
 */
let execa: any;

async function loadExeca() {
    execa = await import('execa');
}

loadExeca();

const DefaultImagickConfig: ImagickConfig = {
    imagickPath: 'magick',
    srcPath: null,
    dstPath: null,
    srcFormat: null,
    dstFormat: null,
    options: {
        width: 200,
        height: 200,
    },
}

export default class Imagick {
    private config: ImagickConfig = DefaultImagickConfig;

    /**
     * Constructor for the Imagick class.
     * @param {ImagickConfig} config Configurations for the Imagick instance.
     * @throws {Error} Throws an error if the source path or destination path is not provided.
     */
    constructor(config: ImagickConfig = {}) {
        this.config = { ...this.config, ...config };
        this.init();
    }

    /**
     * Initializes the Imagick instance by validating the essential configuration paths.
     *
     * @throws {Error} Throws an error if the source path or destination path is not provided.
     */
    private init(): void {
        if (!this.config.imagickPath || !this.config.srcPath || !this.config.dstPath) {
            throw new Error('Source and destination paths are required.');
        }
    }


    /**
     * Asynchronously converts an image using ImageMagick with specified configurations.
     *
     * @returns {Promise<string>} A promise that resolves with a success message if the image is converted successfully.
     *
     * @throws Will reject with an error if the source or destination paths are not provided
     * or if the conversion process fails.
     */
    public async convertAsync(params: { scale?: number } = { scale: 100 }): Promise<string> {
        return new Promise(async (resolve, reject) => {
            const command = `${this.config.imagickPath} ${this.config.srcPath} -scale ${params.scale}% ${this.config.dstPath}`;

            try {
                await execa`${command}`;
                resolve('Image converted successfully');
            } catch (error) {
                reject(error);
            }
        });
    }


    /**
     * Synchronously converts an image using ImageMagick with specified configurations.
     * 
     * @returns {Buffer | string | unknown} A Buffer of the converted image, a string success message if the image is converted successfully, or an unknown error if the conversion process fails.
     * 
     * @throws Will throw an error if the source or destination paths are not provided 
     * or if the conversion process fails.
     */
    public convertSync(params: { scale?: number } = { scale: 100 }): Buffer | string | unknown {
        const command = `${this.config.imagickPath} ${this.config.srcPath} -scale ${params.scale}% ${this.config.dstPath}`;

        try {
            return execSync(command);
        } catch (error: unknown) {
            return error;
        }
    }
}
