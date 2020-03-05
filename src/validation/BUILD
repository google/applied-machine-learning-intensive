py_test(
    name = "colab_test",
    size = "small",
    srcs = ["colab_test.py"],
    data = [
        "//engedu/fuzzy/amli/content:colabs",
    ],
    python_version = "PY3",
    deps = [
        "//engedu/fuzzy/amli/lib:colab",
        "//pyglib:resources",
        "//testing/pybase",
        "//third_party/py/nbformat",
    ],
)

py_test(
    name = "spellcheck_test",
    size = "large",
    srcs = ["spellcheck_test.py"],
    data = [
        "//engedu/fuzzy/amli/content:colabs",
    ],
    python_version = "PY3",
    deps = [
        "//file/base",
        "//file/google_src",
        "//file/localfile",
        "//file/srcfs:pysrcfs",
        "//i18n/encodings/inputconverter:pywrapinputconverter",
        "//net/rpc/python:pywraprpc",
        "//net/rpc/python:rpcutil",
        "//net/rpc/python/contrib:rpc_retry",
        "//pyglib:gfile",
        "//pyglib:resources",
        "//spelling/spelling2/red_underline/proto:spelling-check-service_py_pb2",
        "//testing/pybase",
        "//third_party/py/nbformat",
        "//third_party/py/ratelimiter",
    ],
)
