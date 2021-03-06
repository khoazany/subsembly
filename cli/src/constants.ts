
/**
 * @description Commonly used constants
 */
export class Constants {
    
    /**
     * @description URL for the latest bundled release of the Subsembly starter
     */
    static readonly REPO_URL: string = 'https://api.github.com/repos/LimeChain/subsembly/releases/latest';
    
    /**
     * @description Files/directories to ignore while initializing Subsembly project
     */
    static readonly INIT_IGNORE: RegExp[] = [
        /cli/,
        /scripts/,
        /Makefile/,
        /README.md/,
        /images/,
        /build.js/,
        /utils/,
        /.gitignore/
    ];
    
    /**
     * @description Unzipped file starts with the prefix of github_account + repo_name
     */
    static readonly ZIP_FILE_PREFIX: string = 'LimeChain-subsembly';
}