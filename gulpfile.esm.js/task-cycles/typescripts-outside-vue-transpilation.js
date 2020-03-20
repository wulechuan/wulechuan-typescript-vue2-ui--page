import through           from 'through2'
import typescript        from 'typescript'
// import gulpUglifyES      from 'gulp-uglify-es'

import replaceExt        from 'replace-ext'
import changeIndentation from 'indent.js'

import {
    createATaskCycle,
} from '@wulechuan/gulp-classical-task-cycle'

export function createOneTaskCycleForCompilingTypeScripts(taskCycleConfig) {
    const {
        descriptionOfCoreTask,
        descriptionOfInputsOfCoreTask,
        sourceGlobs,
        outputFiles,
        compressions = {},
        extraOptions: {
            indentation,
            tsconfig,
        } = {},
    } = taskCycleConfig

    const compressor1 = null
    const compressor2 = null // gulpUglifyES

    return createATaskCycle({
        descriptionOfCoreTask,
        descriptionOfInputsOfCoreTask,

        sourceGlobs,
        outputFiles,
        firstPipeForProcessingSources: processSingleTSFile,

        compressions: {
            ...compressions,

            compressor1IsEnabled: false,
            compressor1,
            compressorOptions1: null,

            compressor2IsDisabled: false,
            compressor2,
            compressorOptions2: null,
        },
    })

    function processSingleTSFile() {
        return through.obj(async function (file, fileEncoding, callback) {
            if (file.isStream()) {
                return callback(createNewGulpError('Streaming is not supported.'))
            }

            if (file.isNull()) {
                return callback(null, file)
            }

            const sourceTSContentString = file.contents.toString(fileEncoding || 'utf-8')

            file.path = replaceExt(file.path, '.js')

            const {
                outputText: javaScriptCodes,
            } = typescript.transpileModule(
                sourceTSContentString,
                tsconfig
            )
            const processedTSContentString = changeIndentation.js(javaScriptCodes, { tabString: indentation })

            file.contents = Buffer.from(processedTSContentString)

            return callback(null, file)
        })
    }
}
