# Getting Started

Getting started with Cypress development is actually quite easy. Because we consider the development and deployment environments for Cypress as a part of its design and are themselves integrated into the code base, you as a developer don't need to do much to 'configure' your own environment. Cypress has scripts that use [Vagrant](http://www.vagrantup.com) to automatically create a virtual development environment for you. All the dependencies for building, deploying, running and testing cypress code are cooked into this environment.

The only development dependencies you will need on your machine are

- [Vagrant](http://www.vagrantup.com) version 7.4+
- Any of the following
  [VirtualBox](http://www.virtualbox.org), 
  [VMware Fusion](https://www.vmware.com/products/fusion), 
  [VMware Workstation](https://www.vmware.com/products/workstation)
- [Git](https://git-scm.com)
- [A Text Editor](https://github.com/vim/vim)
- [Ruby](https://www.ruby-lang.org)

## Source Code

All of the source code for Cypress lives at [our GitHub organization site](https://github.com/cycps). Here you will find the following repositories, for a big picture idea about what the code contained in each does take a look at the [Architecture](/arch) section. The names of the repositories map directly onto their corresponding components in the architecture description.

### Core Components
  - **addie** : design and experimentation automation engine
  - **web** : graphical web-based design environment
  - **data** : back end persistent data storage
### DevOps
  - **test** : development/deployment environment model and integration tests
  - **doc** : source for the documentation you are reading
  - **cycps.github.io** : compiled form of the documentation you are reading

## Up and Running

The best way to get started with Cypress development is to clone and launch the test environment. This will actually also clone all of the other core component repositories as well. It does this to get fresh copies of the latest stable code from GitHub for the core components, subsequently compiling and launching them in the test environment. Let's get started.

Clone into the Cypress test repository

```shell
$ git clone git@github.com:cycps/test.git
```

Go to the test folder and execute the `run.rb` script. This will launch the Cypress development environment as a collection of Vagrant managed virtual machines. This will take a few minutes. Making startup time quicker [is on the radar](https://github.com/cycps/test/issues/1). You may also be asked which adapter on your host machine to connect bridged adapters in the virtual machines to, please select an adapter that is connected to the internet. Also note that you need internet connectivity for this step as the installation procedure for the machines accesses remote servers for software download in the initial setup.

```shell
$ cd test  
$ ./run.rb  
```

When the startup script finished you will have a vagrant development environment with 4 virtual machines. You can verify the environment as follows.  Note that if you are running VirtualBox then the text inside the parentheses to the right of running will say `virtualbox`.

```shell
$ cd env
$ vagrant status
Current machine states:

data                      running (vmware_fusion)
svc                       running (vmware_fusion)
client                    running (vmware_fusion)
web                       running (vmware_fusion)

This environment represents multiple VMs. The VMs are all listed
above with their current state. For more information about a specific
VM, run `vagrant status NAME`.
```

Each of these virtual machines has Cypress components installed. In fact when the environment was brought up, the source code for each component in the environment was mounted onto its respective machine using NFS, built and then installed on that machine. The NFS mounted source directories are located in a hidden folder called `.test` located in the `test` folder we cloned from GitHub. You can edit the sources here locally using your text editor, the changes will be propagated immediately to the virtual environment where you can build and test your changes or additions.

To get a feel for how this works, lets launch the addie/design daemon on the `svc` VM and then run some API tests that target addi/design from the `client` VM. You will need two terminal windows for this, each with the CWD in the test/env folder. First let's use Vagrants ssh functionality to bring up a terminal on the `svc` machine. Once the terminal is up we will launch addie/design.

```shell
$ vagrant ssh svc
Welcome to Ubuntu 15.04 (GNU/Linux 3.19.0-15-generic x86_64)

 * Documentation:  https://help.ubuntu.com/
vagrant@addie:~$ design
2015/07/21 00:57:26 Cypress Design Automator .... Go!
2015/07/21 00:57:26 Opening connecton to pgdb
2015/07/21 00:57:26 listening ...
```
Now that addie/design is up and running, lets fire some tests at it from `client`

```shell
$ vagrant ssh client
Welcome to Ubuntu 15.04 (GNU/Linux 3.19.0-15-generic x86_64)

 * Documentation:  https://help.ubuntu.com/
vagrant@client:~$ cd ~/.cypress/addie/spec/
vagrant@client:~/.cypress/addie/spec$ ./run_dredd_api_tests.sh 
info: Beginning Dredd testing...
info: Found Hookfiles: /home/vagrant/.cypress/addie/spec/hookstls.js
hook: before all
pass: POST /design/system47 duration: 59ms
pass: POST /design/system47 duration: 40ms
pass: POST /design/system47 duration: 28ms
pass: POST /design/system47/delete duration: 44ms
complete: 4 passing, 0 failing, 0 errors, 0 skipped, 4 total
complete: Tests took 181ms
```
All of the source code folders are mounted at `~/.cypress/<project-name>`. Now if you wanted to edit the source of addie/design and see if still passes it's client API tests, you could modify the code on your local machine, rebuild addie/test (see addie docs for how to build, install and test addie code) and see if your modifications preserve the results of the tests.
