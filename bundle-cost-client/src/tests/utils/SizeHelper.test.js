import React from "react";
import {UrlHelper} from "../../utils/urlHelper";
import {prettifySize} from "../../utils/sizeHelper";


describe("prettifySize", () => {

    it("should return pretty size", () => {
        expect(prettifySize(1024)).toEqual("1.02 kB");
    });

    it("should handle null size", () => {
        expect(prettifySize(null)).toEqual("-");
    });

    it("should handle non numeric size value", () => {
        expect(prettifySize("invalid")).toEqual("-");
    });
});

