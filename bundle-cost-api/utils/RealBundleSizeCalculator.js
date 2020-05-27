const getBuiltPackageStats = require('package-build-stats');

class RealBundleSizeCalculator {
    static async getBuildStats(packageName) {
        try {
            return await getBuiltPackageStats(packageName)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = RealBundleSizeCalculator;