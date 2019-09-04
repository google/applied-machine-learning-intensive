# -*- coding: utf-8 -*-
"""Configuration file for Applied Computing 101 textbook.

This file was generated by running `runestone init` then deleting unused code.
"""

import pkg_resources
from runestone import runestone_extensions
from runestone import runestone_static_dirs

extensions = ['sphinx.ext.mathjax'] + runestone_extensions()

templates_path = [
    pkg_resources.resource_filename(
        'runestone',
        'common/project_template/_templates',
    )
]

source_suffix = '.rst'
master_doc = 'index'
project = 'Runestone Interactive Overview'

version = '0.0.1'
release = '0.0'

exclude_patterns = []
pygments_style = 'sphinx'
keep_warnings = True

rst_prolog = (
    # For fill-in-the-blank questions, provide a convenient means to indicate a
    # blank.
    """

.. |blank| replace:: :blank:`x`
"""

    # For literate programming files, provide a convenient way to refer to a
    # source file's name. See `runestone.lp.lp._docname_role`.
    """.. |docname| replace:: :docname:`name`
""")

runestone_server_side_grading = False

# Disable invalid-name pylint, since CodeChat variable names need to be in the
# form below, namely CodeChat_.
# pylint: disable=invalid-name
CodeChat_lexer_for_glob = {
    # Otherwise, Pygments picks the wrong lexer for CSS...
    '*.css': 'CSS',
    # ... and for JavaScript.
    '*.js': 'JavaScript',
}
CodeChat_excludes = []
# pylint: enable=invalid-name

inline_highlight_respect_highlight = True
inline_highlight_literals = False

html_theme = 'sphinx_bootstrap'
html_theme_options = {
    'navbar_title': 'AC101 Textbook',
    'navbar_site_name': 'Chapters',
    'globaltoc_depth': 1,
    'globaltoc_includehidden': 'true',
    'navbar_class': 'navbar',
    'navbar_fixed_top': 'true',
    'source_link_position': 'nav',
}
html_theme_path = [
    pkg_resources.resource_filename(
        'runestone',
        'common/project_template/_templates/plugin_layouts',
    )
]
html_title = 'Runestone Interactive Overview'
html_short_title = 'Runestone Interactive Overview'
html_static_path = runestone_static_dirs()
html_show_copyright = False
htmlhelp_basename = 'PythonCoursewareProjectdoc'
