"""Tests for google3.engedu.fuzzy.amli.lib.colab."""

import copy
import os
from absl import flags
import nbformat
from google3.engedu.fuzzy.amli.lib.colab import Colab
from google3.testing.pybase import googletest

FLAGS = flags.FLAGS

COPYRIGHT = (0, 1)
TITLE = (2, 3)
OVERVIEW = (4, 5, 6, 7, 8)
OBJECTIVES = (5,)
PREREQS = (6,)
DURATION = (7,)
GRADING = (8,)
CONTENT = (9, 10)
RESOURCES = (11,)
EXERCISES = (12, 13, 14, 15, 16, 17, 18, 19, 20)
INDIVIDUAL_EXERCISES = (((13,), (14, 15), (16, 17, 18, 19, 20)),)


class ColabTest(googletest.TestCase):

  @classmethod
  def setUpClass(cls):
    super(ColabTest, cls).setUpClass()
    colab_path = os.path.join(FLAGS.test_srcdir,
                              'google3/engedu/fuzzy/amli/lib/colab.ipynb')
    cls.notebook = nbformat.read(colab_path, as_version=4)

  def __make_assertions(
      self,
      lab,
      expected_name='AMLI Colab',
      expected_private_outputs=True,
      expected_toc_visible=True,
      expected_collapsed_sections=('copyright', 'exercise-1-key-1'),
      expected_kernelspec=('python3', 'Python 3'),
      expected_copyright=COPYRIGHT,
      expected_title=TITLE,
      expected_overview=OVERVIEW,
      expected_objectives=OBJECTIVES,
      expected_prereqs=PREREQS,
      expected_duration=DURATION,
      expected_grading=GRADING,
      expected_content=CONTENT,
      expected_resources=RESOURCES,
      expected_exercises=EXERCISES,
      expected_individual_exercises=INDIVIDUAL_EXERCISES):
    self.assertEqual(lab.name, expected_name, 'Unexpected name')
    self.assertEqual(lab.private_outputs, expected_private_outputs,
                     'Unexpected private outputs setting')
    self.assertEqual(lab.toc_visible, expected_toc_visible,
                     'Unexpected table of contents visibility setting')
    self.assertEqual(lab.collapsed_sections, list(expected_collapsed_sections),
                     'Unexpected collapsed sections')
    self.assertEqual(lab.kernelspec['name'], expected_kernelspec[0],
                     'Unexpected kernelspec name')
    self.assertEqual(lab.kernelspec['display_name'], expected_kernelspec[1],
                     'Unexpected kernelspec display name')
    self.assertEqual(lab.copyright, list(expected_copyright),
                     'Unexpected copyright section')
    self.assertEqual(lab.title, list(expected_title),
                     'Unexpected title section')
    self.assertEqual(lab.overview, list(expected_overview),
                     'Unexpected overview section')
    self.assertEqual(lab.learning_objectives,
                     list(expected_objectives),
                     'Unexpected learning objectives section')
    self.assertEqual(lab.prerequisites, list(expected_prereqs),
                     'Unexpected prerequisites section')
    self.assertEqual(lab.duration, list(expected_duration),
                     'Unexpected duration section')
    self.assertEqual(lab.grading_criteria, list(expected_grading),
                     'Unexpected grading criteria section')
    self.assertEqual(lab.content, list(expected_content),
                     'Unexpected content section')
    self.assertEqual(lab.resources, list(expected_resources),
                     'Unexpected resources section')
    self.assertEqual(lab.exercises, list(expected_exercises),
                     'Unexpected exercises section')

    individual_exercises = []
    for ex in expected_individual_exercises:
      individual_exercises.append({
          'question': list(ex[0]),
          'student_solution': list(ex[1]),
          'answer_key': list(ex[2]),
      })

    self.assertEqual(lab.individual_exercises, individual_exercises,
                     'Unexpected individual exercises section')

  def test_load_from_local_file(self):
    colab_path = os.path.join(FLAGS.test_srcdir,
                              'google3/engedu/fuzzy/amli/lib/colab.ipynb')
    lab = Colab.from_local_file(colab_path)
    self.__make_assertions(lab)

  def test_init_missing_top_level_keys(self):
    for k in ('cells', 'metadata', 'nbformat', 'nbformat_minor'):
      notebook = copy.deepcopy(self.notebook)
      del notebook[k]
      self.assertRaisesRegex(Exception, k, Colab, notebook)

  def test_init_missing_metadata_colab(self):
    notebook = copy.deepcopy(self.notebook)
    del notebook['metadata']['colab']
    self.assertRaisesRegex(Exception, 'colab metadata', Colab, notebook)

  def test_init_missing_metadata_colab_name(self):
    notebook = copy.deepcopy(self.notebook)
    del notebook['metadata']['colab']['name']
    lab = Colab(notebook)
    self.assertEqual(lab.name, '')

  def test_init_missing_metadata_colab_private_outputs(self):
    notebook = copy.deepcopy(self.notebook)
    del notebook['metadata']['colab']['private_outputs']
    lab = Colab(notebook)
    self.__make_assertions(lab, expected_private_outputs=False)

  def test_init_missing_metadata_colab_collapsed_sections(self):
    notebook = copy.deepcopy(self.notebook)
    del notebook['metadata']['colab']['collapsed_sections']
    lab = Colab(notebook)
    self.__make_assertions(lab, expected_collapsed_sections=tuple())

  def test_init_missing_metadata_colab_toc_visible(self):
    notebook = copy.deepcopy(self.notebook)
    del notebook['metadata']['colab']['toc_visible']
    lab = Colab(notebook)
    self.__make_assertions(lab, expected_toc_visible=False)

  def test_init_missing_metadata_kernelspec(self):
    notebook = copy.deepcopy(self.notebook)
    del notebook['metadata']['kernelspec']
    self.assertRaisesRegex(Exception, 'kernelspec', Colab, notebook)

  def test_init_missing_metadata_kernelspec_name(self):
    notebook = copy.deepcopy(self.notebook)
    del notebook['metadata']['kernelspec']['name']
    lab = Colab(notebook)
    self.__make_assertions(lab, expected_kernelspec=('', 'Python 3'))

  def test_init_missing_metadata_kernelspec_display_name(self):
    notebook = copy.deepcopy(self.notebook)
    del notebook['metadata']['kernelspec']['display_name']
    lab = Colab(notebook)
    self.__make_assertions(lab, expected_kernelspec=('python3', ''))

  def test_init_missing_copyright(self):
    notebook = copy.deepcopy(self.notebook)
    for i in reversed(COPYRIGHT):
      del notebook['cells'][i]
    lab = Colab(notebook)
    shift = len(COPYRIGHT)

    ie = self.__shift_individual_exercise(shift)

    # Removing the copyright section causes the indexes of all sections after it
    # to shift up by the number of cells that were in the copyright section. The
    # code below performs that shifting of indexes before calling
    # __make_assertions. This pattern is seen in subsequent testing functions
    # that remove sections.
    self.__make_assertions(lab,
                           expected_copyright=tuple(),
                           expected_title=[x - shift for x in TITLE],
                           expected_overview=[x - shift for x in OVERVIEW],
                           expected_objectives=[x - shift for x in OBJECTIVES],
                           expected_prereqs=[x - shift for x in PREREQS],
                           expected_duration=[x - shift for x in DURATION],
                           expected_grading=[x - shift for x in GRADING],
                           expected_content=[x - shift for x in CONTENT],
                           expected_resources=[x - shift for x in RESOURCES],
                           expected_exercises=[x - shift for x in EXERCISES],
                           expected_individual_exercises=ie,
                          )

  def test_init_missing_title(self):
    notebook = copy.deepcopy(self.notebook)
    for i in reversed(TITLE):
      del notebook['cells'][i]
    lab = Colab(notebook)
    shift = len(COPYRIGHT)

    ie = self.__shift_individual_exercise(shift)

    self.__make_assertions(lab,
                           expected_title=tuple(),
                           expected_overview=[x - shift for x in OVERVIEW],
                           expected_objectives=[x - shift for x in OBJECTIVES],
                           expected_prereqs=[x - shift for x in PREREQS],
                           expected_duration=[x - shift for x in DURATION],
                           expected_grading=[x - shift for x in GRADING],
                           expected_content=[x - shift for x in CONTENT],
                           expected_resources=[x - shift for x in RESOURCES],
                           expected_exercises=[x - shift for x in EXERCISES],
                           expected_individual_exercises=ie,
                          )

  def test_init_missing_overview(self):
    notebook = copy.deepcopy(self.notebook)
    for i in reversed(OVERVIEW):
      del notebook['cells'][i]
    lab = Colab(notebook)
    shift = len(OVERVIEW)

    ie = self.__shift_individual_exercise(shift)

    self.__make_assertions(lab,
                           # When the overview is missing, the title section
                           # 'eats' the content section.
                           expected_title=list(TITLE) + [
                               x - shift for x in CONTENT],
                           expected_overview=tuple(),
                           expected_objectives=tuple(),
                           expected_prereqs=tuple(),
                           expected_duration=tuple(),
                           expected_grading=tuple(),
                           expected_content=tuple(),
                           expected_resources=[x - shift for x in RESOURCES],
                           expected_exercises=[x - shift for x in EXERCISES],
                           expected_individual_exercises=ie,
                          )

  def test_init_missing_content(self):
    notebook = copy.deepcopy(self.notebook)
    for i in reversed(CONTENT):
      del notebook['cells'][i]
    lab = Colab(notebook)
    shift = len(CONTENT)

    ie = self.__shift_individual_exercise(shift)

    self.__make_assertions(lab,
                           expected_content=tuple(),
                           expected_resources=[x - shift for x in RESOURCES],
                           expected_exercises=[x - shift for x in EXERCISES],
                           expected_individual_exercises=ie,
                          )

  def test_init_missing_resources(self):
    notebook = copy.deepcopy(self.notebook)
    for i in reversed(RESOURCES):
      del notebook['cells'][i]
    lab = Colab(notebook)
    shift = len(RESOURCES)

    ie = self.__shift_individual_exercise(shift)

    self.__make_assertions(lab,
                           expected_resources=tuple(),
                           expected_exercises=[x - shift for x in EXERCISES],
                           expected_individual_exercises=ie,
                          )

  def test_init_missing_exercises(self):
    notebook = copy.deepcopy(self.notebook)
    for i in reversed(EXERCISES):
      del notebook['cells'][i]
    lab = Colab(notebook)
    self.__make_assertions(lab,
                           expected_exercises=tuple(),
                           expected_individual_exercises=tuple())

  def __shift_individual_exercise(self, shift):
    ie = []
    for exercise in INDIVIDUAL_EXERCISES:
      exer = []
      for values in exercise:
        exer.append([x - shift for x in values])
      ie.append(exer)
    return ie

if __name__ == '__main__':
  googletest.main()
