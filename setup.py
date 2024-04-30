from os.path import dirname
from os.path import join
from setuptools import setup, find_packages


def readme() -> str:
    """Utility function to read the README file.
    Used for the long_description.  It's nice, because now 1) we have a top
    level README file and 2) it's easier to type in the README file than to put
    a raw string in below.
    :return: content of README.md
    """
    return open(join(dirname(__file__), "README.md")).read()


setup(
    name="streamlit-drawable-canvas-mrmstn",
    author="Fanilo ANDRIANASOLO",
    author_email="contact@andfanilo.com",
    description="A Streamlit custom component for a free drawing canvas using Fabric.js.",
    long_description=readme(),
    long_description_content_type="text/markdown",
    url="https://github.com/andfanilo/streamlit-drawable-canvas",
    packages=['streamlit_drawable_canvas'],
    package_data={
        # Only specify folders and files you want to include
        'streamlit_drawable_canvas': [
            'frontend/build/*'
        ],
    },
    include_package_data=False,
    classifiers=[],
    python_requires=">=3.6",
    install_requires=[
        "Pillow",
        "numpy",
        "streamlit >= 0.63",
    ]
)
