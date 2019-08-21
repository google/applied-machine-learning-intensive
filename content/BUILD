package_group(
    name = "colab_readers",
    packages = [
        "//engedu/fuzzy/amli/...",
    ],
)

exports_files(glob([
    "*/*/slides.html",
]))

filegroup(
    name = "colabs",
    srcs = glob(["*/*/*.ipynb"]) + ["template.ipynb"],
    visibility = [":colab_readers"],
)

filegroup(
    name = "content",
    srcs = glob(["*/*/*"]),
    visibility = [":colab_readers"],
)
