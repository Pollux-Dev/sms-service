import os

import sys

# at -> append, wt -> write, rt -> read

if len(sys.argv) < 3:
    print('Need the path and components_name dumbass : <filenames> ')
    exit()

path = sys.argv[1]

if not path.startswith('/'):
    print('your path does not start with / ->' + path)
    path = '/' + path

name = sys.argv[2]
src_name = os.getcwd() + path + name

if not name[0].isupper():
    print('Are You sure Compoenent with SMALL - Letters : - ?'.replace('-', name))
    exit()

styleTxt = """@use '@/styles/index.scss' as s;

.container{
  width: 100%;

  // @include s.margin(top, 10rem);
  // @include s.padding(bottom, 8rem);

  & :local{

    .wrapper{

    }
  }
}
"""

componentTxt = """import React from "react";
import s from './_.module.scss'

const - = () => {
  return (
    <div className={s.container} >

    </div>
  );
};

export default -;

"""

if not os.path.exists(src_name):
    os.mkdir(src_name)
    with open(src_name + '/-.module.scss'.replace('-', name.lower()), 'wt') as f:
        f.write(styleTxt)

    with open(src_name + '/index.tsx', 'wt') as f:
        f.write(componentTxt.replace('-', name).replace('_', name.lower()))
else:
    raise Exception('directory already exists: -'.replace('-', name))
