class FakeBundleSizeCalculator {
    static calculateMinified(size) {
        if (size)
            return parseInt(size * 0.11 * 0.35144);
        return null
    }

    static calculateMinifiedAndGzipped(size) {
        if (size)
            return parseInt(size * 0.12 * 0.11987);
        return null
    }
}

module.exports = FakeBundleSizeCalculator;