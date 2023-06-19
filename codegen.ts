
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: "http://localhost:3080/graphql",
    documents: 'src/@core/graphql/**/*graphql',
    ignoreNoDocuments: true,
    generates: {
        "src/generated.ts": {
            plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],
            config: {
                documentMode: 'string',
                dedupeOperationSuffix: true,
                fetcher: 'graphql-request'
            },
        }
    },
    hooks: {
        afterAllFileWrite: ['prettier --write']
    },
};

export default config;
