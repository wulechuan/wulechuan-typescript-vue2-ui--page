import through from 'through2'
import path from 'path'

import {
    createATaskCycle,
} from '@wulechuan/gulp-classical-task-cycle'

import {
    transformContentStringOfSingleVueFile,
} from '@wulechuan/vue2-sfc-from-typescript-to-javascript'

export function createOneTaskCycleForProcessVueFilesOfTypeScripts(options) {
    const {
        descriptionOfCoreTask,
        descriptionOfInputsOfCoreTask,
        sourceGlobs,
        outputFiles,
        extraOptions = {},
    } = options

    const {
        vueFileConversionOptions,
    } = extraOptions

    return createATaskCycle({
        descriptionOfCoreTask,
        descriptionOfInputsOfCoreTask,

        sourceGlobs,
        outputFiles,
        firstPipeForProcessingSources: processSingleVueFile,
        // optionsArrayToApplyForTheFirstPipe,

        compressions: {
            shouldNotOutputUncompressedVersion: false,
            shouldNotOutputCompressedVersion: true,
            compressor1: null,
            compressor2: null,
        },
    })

    function processSingleVueFile() {
        return through.obj(async function (file, fileEncoding, callback) {
            if (file.isStream()) {
                return callback(createNewGulpError('Streaming is not supported.'))
            }

            if (file.isNull()) {
                return callback(null, file)
            }

            const sourceVueFileName = path.basename(file.path)

            const sourceVueContents = file.contents.toString(fileEncoding || 'utf-8')
            const processedVueContents = await transformContentStringOfSingleVueFile(
                sourceVueContents,
                {
                    ...vueFileConversionOptions,
                    sourceContentDescriptionName: sourceVueFileName,
                }
            )

            file.contents = Buffer.from(processedVueContents)

            return callback(null, file)
        })
    }
}
