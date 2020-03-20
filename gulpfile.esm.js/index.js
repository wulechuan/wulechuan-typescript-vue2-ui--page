import {
    createOneTaskCycleForProcessVueFilesOfTypeScripts,
} from './task-cycles/vue-transform'

import {
    createOneTaskCycleForCompilingTypeScripts,
} from './task-cycles/typescripts-outside-vue-transpilation'

import {
    createOneTaskCycleForCompilingStylusOfOneTheme,
} from './task-cycles/css-stylus-compilation'

import {
    create3HighOrderTasksUponMultipleTaskCycles,
} from '@wulechuan/gulp-classical-task-cycle'



import tsconfig from '../tsconfig'

const outputFileIndentation = '    '

const tcProcessVueFilesOfTypeScripts = createOneTaskCycleForProcessVueFilesOfTypeScripts({
    descriptionOfCoreTask: '将所有由 TypeScript 写成的 .vue 文件转换成 JavaScript 版本',
    descriptionOfInputsOfCoreTask: '用 TypeScript 写成的 .vue 文件',
    sourceGlobs: {
        rootFolderPath: './source',
        relativeGlobsSpecificallyForThisTaskCycle: [
            '*.vue',
        ],
        extraSourceGlobsToWatch: [
            './source/types/**/*',
        ],
    },

    outputFiles: {
        // https://github.com/wulechuan/wulechuan-js-gulp-4-classical-task-cycle/blob/master/documents/refs/en-US/api-create-a-task-cycle.md

        rootFolderPath: './dist',
        forBatchOutputFiles: {
            relativeGlobsOfAllPossibleOutputs: [
                '*.vue',
            ],
        },
    },

    extraOptions: {
        vueFileConversionOptions: {
            indentation: outputFileIndentation,
            tsconfig,

            // shouldNotCompileStylus: true,
            // shouldNotCompileSass:   true,
            // shouldNotCompileLESS:   true,
        },
    },
})



const tcCompileTypeScriptFilesOutsideVueFiles = createOneTaskCycleForCompilingTypeScripts({
    descriptionOfCoreTask: '将所有独立的（即不在 .vue 文件中的）TypeScript 编译为 JavaScript',
    descriptionOfInputsOfCoreTask: '独立的 .ts 文件',

    sourceGlobs: {
        rootFolderPath: './source',

        relativeGlobsSpecificallyForThisTaskCycle: [
            'helpers.ts',
        ],
    },

    outputFiles: {
        rootFolderPath: './dist',

        forBatchOutputFiles: {
            relativeGlobsOfAllPossibleOutputs: [
                '*.js',
            ],
        },
    },

    extraOptions: {
        indentation: outputFileIndentation,
        tsconfig,
    },
})



const tcCompileAllStylusOutsideVueFiles = createOneTaskCycleForCompilingStylusOfOneTheme({
    descriptionOfCoreTask: '将所有独立的（即不在 .vue 文件中的）Stylus 编译为 CSS',
    descriptionOfInputsOfCoreTask: '独立的 .styl 文件',

    sourceGlobs: {
        rootFolderPath: './source/styles',

        relativeGlobsSpecificallyForThisTaskCycle: [
            'default*.styl',
        ],

        extraSourceGlobsToWatch: [
            './source/styles/**/*.styl',
        ],
    },

    outputFiles: {
        rootFolderPath: './dist',

        forBatchOutputFiles: {
            relativeGlobsOfAllPossibleOutputs: [
                '*.css',
            ],
        },

        // forSingleOrTwoOutputFiles: {
        //     fileBaseName: 'default-theme',
        //     fileExtWithoutDot: 'css',
        // },
    },

    compressions: {
        shouldNotOutputUncompressedVersion: false,
        shouldNotOutputCompressedVersion: true,
    },

    // extraOptions: {
    //     shouldDiscardMostCommentsEvenIfNotCompressCSS: false,
    // },
})



const {
    // cleanAllOldOuputs,
    buildEverythingOnce,
    watchEverything,
} = create3HighOrderTasksUponMultipleTaskCycles({
    taskCyclesInPallarel: [
        tcProcessVueFilesOfTypeScripts,
        tcCompileTypeScriptFilesOutsideVueFiles,
        tcCompileAllStylusOutsideVueFiles,
    ],
})

export const buildOnce     = buildEverythingOnce
export const buildAndWatch = watchEverything
export default buildAndWatch
