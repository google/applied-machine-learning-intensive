# Library for working with AMLI content.

package_group(
    name = "amli_project",
    packages = [
        "//engedu/fuzzy/amli/...",
    ],
)

py_library(
    name = "colab",
    srcs = [
        "colab.py",
        "drive.py",
        "lint.py",
    ],
    srcs_version = "PY3ONLY",
    visibility = [":amli_project"],
    deps = [
        "//apiserving/clients/python/google/auth:corp_credentials",
        "//third_party/py/google_auth_httplib2",
        "//third_party/py/google_auth_oauthlib",
        "//third_party/py/googleapiclient",
        "//third_party/py/nbformat",
    ],
)

py_test(
    name = "colab_tests",
    size = "small",
    srcs = [
        "colab_tests.py",
    ],
    data = [
        "colab.ipynb",
    ],
    python_version = "PY3",
    srcs_version = "PY3ONLY",
    deps = [
        ":colab",
        "//pyglib",
        "//testing/pybase",
    ],
)

py_test(
    name = "drive_tests",
    size = "small",
    srcs = [
        "drive_tests.py",
    ],
    python_version = "PY3",
    srcs_version = "PY3ONLY",
    deps = [
        ":colab",
        "//pyglib",
        "//testing/pybase",
    ],
)

py_test(
    name = "lint_tests",
    size = "small",
    srcs = [
        "lint_tests.py",
    ],
    data = [
        "colab.ipynb",
    ],
    python_version = "PY3",
    srcs_version = "PY3ONLY",
    deps = [
        ":colab",
        "//pyglib",
        "//testing/pybase",
    ],
)
