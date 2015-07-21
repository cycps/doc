# Cypress Synopsis
Cypress is an experimental design engine for internetworked cyber-physical systems. An internetworked cyber-physical (ICPS) system typically is made up of the following.

- Computer Networks
- Physical Networks
- Sensors & Actuators
- Distributed Monitoring & Control Software

Take for example, the power grid. Computer networks comprise the computers, routers, and switches that interconnect substations and subsequently monitoring and control systems. Physical networks comprise the generators, transformers, transmission lines, busbars and load centres that connect society to electric power. Sensors and actuators are the conduit by which the computer and physical networks are themselves connected. Taken together these components are an ICPS.

Cypress allows users to design ICPS system experiments and instantiate them in a hybrid simulated-physical emulated-cyber (SPEC) environment. This is accomplished through the combination of the following.

- Graphical Modeling Environment
- ICPS Data Model 
- ICPS Model Analysis and Interrogation Algorithm Suite
- Automated Experimentation Runtime
- Simulation Engine for Network Control Environments
- DeterLab Emulated Network Environment

# About This Document
This document covers the design and implementation of the Cypress experimental design engine. Cypress is the first of its kind. To date there are many tools for building physical control systems such as Matlab/Simulink, System Modeler, Dymola, Modelica etc. Many of these environments even include simple simulated communication models. What Cypress provides that is new is emulated cyber environment integration with a simulation engine purpose built for that task. Pragmatically what this provides is an increase in fidelity. Control algorithms are implemented as real distributed software that executes in a real network environment on real operating systems that have all the quirks of real networking stacks. What this also means is that _cyber environment design_ is a first class citizen in the overall system design space. From the designs, to the data models, to the execution environment itself, Cypress is a truly cyber-physical platform.
