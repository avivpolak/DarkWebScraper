const cliProgress = require("cli-progress");
export const bar= (text:string) => new cliProgress.SingleBar({format: text + '{bar}'+ ' {percentage}% || {value}/{total}'}, cliProgress.Presets.shades_grey);