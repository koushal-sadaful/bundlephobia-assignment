const FakeBundleSizeCalculator = require("./FakeBundleSizeCalculator");
const RealBundleSizeCalculator = require("./RealBundleSizeCalculator");

class NpmDataTransformer {

    static getLastThreeVersionData(npmData, versionIds) {
        const lastThreeVersionIds = versionIds.slice(-3);
        let lastThreeVersionData = [];
        lastThreeVersionIds.map(id => {
            lastThreeVersionData = lastThreeVersionData.concat([this.createVersionPayload(id, npmData)])
        });
        return lastThreeVersionData;
    }

    static getLastVersionByIndex(versionIds, lastMajorVersion, positionOfIndex) {
        let pointerCurrentRevision = versionIds.length - 1;
        let pointerPreviousRevision = versionIds.length - 2;

        while (pointerPreviousRevision > 0 && lastMajorVersion == null) {
            let currentRevisionIdSplit = versionIds[pointerCurrentRevision].split('.');
            let previousRevisionIdSplit = versionIds[pointerPreviousRevision].split('.');

            if (previousRevisionIdSplit[positionOfIndex] !== currentRevisionIdSplit[positionOfIndex])
                lastMajorVersion = versionIds[pointerPreviousRevision];
            pointerCurrentRevision--;
            pointerPreviousRevision--
        }
        return lastMajorVersion;
    }

    static getLastMajorVersionData(npmData, versionIds) {
        let lastMajorVersion = null;
        if (versionIds.length < 4) {
            lastMajorVersion = versionIds[0]
        } else {
            lastMajorVersion = this.getLastVersionByIndex(versionIds, lastMajorVersion, 0);
            lastMajorVersion = this.getLastVersionByIndex(versionIds, lastMajorVersion, 1);
            lastMajorVersion = this.getLastVersionByIndex(versionIds, lastMajorVersion, 2);
        }
        console.log("Last Major Version: ", lastMajorVersion)
        return this.createVersionPayload(lastMajorVersion, npmData);
    }

    static createVersionPayload(versionId, npmData) {
        const unpackedSize = npmData.versions[versionId]["dist"]["unpackedSize"] || null
        return {
            version: versionId,
            unpackedSize: unpackedSize,
            minifiedSize: FakeBundleSizeCalculator.calculateMinified(unpackedSize),
            minifiedAndGzipedSize: FakeBundleSizeCalculator.calculateMinifiedAndGzipped(unpackedSize),
        };
    }

    static formatPayload(npmData, versionRequested) {
        const versionIds = Object.keys(npmData.versions);
        if (!versionRequested)
            versionRequested = npmData["dist-tags"]["latest"];
        console.log("Current Version: ", versionRequested);

        let previousVersions = this.getLastThreeVersionData(npmData, versionIds);
        let lastMajorVersionData = this.getLastMajorVersionData(npmData, versionIds);
        console.log(previousVersions.indexOf(lastMajorVersionData));

        if (previousVersions.indexOf(lastMajorVersionData) === -1)
            previousVersions = previousVersions.concat(lastMajorVersionData);

        const versionSpecificData = npmData.versions[versionRequested];
        const realStats = RealBundleSizeCalculator.getBuildStats(versionSpecificData["name"])
        console.log(realStats)

        const currentVersionPayload = this.createVersionPayload(versionRequested, npmData)
        const packageDetails = {
            description: versionSpecificData["description"],
            name: versionSpecificData["name"],
            chartData: previousVersions
        }
        return {...packageDetails, ...currentVersionPayload}
    }
}

module.exports = NpmDataTransformer
