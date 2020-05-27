import prettyBytes from "pretty-bytes";

export const prettifySize = (size) => {
    if(size && Number.isInteger(size))
        return prettyBytes(size);
    else
        return "-"
};