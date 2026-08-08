# Salesforce Enterprise Operations & Dynamic Workflow Orchestrator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-grade, enterprise Salesforce Operations Orchestrator featuring advanced Apex design patterns (Selector/Service layers, QueueableChains, Platform Event Async Logger, Dynamic SOQL Engine) and a rich reactive LWC suite (Custom Datatable, LMS PubSub, Real-Time Event Monitor, Seeder Utility, and Jest tests).

**Architecture:** Decoupled Enterprise Layering: Apex Domain/Selector/Service layers with FFLIB-style patterns and Platform Event logging; dynamic runtime SOQL generation with field-level security enforcement (`Security.stripInaccessible`); state-driven LWC tree using Lightning Message Service (`orchestratorChannel`), custom lightning-datatable cell renderers, dynamic filtering, modal drawers, and bulk batch processing.

**Tech Stack:** Salesforce DX, Apex, Lightning Web Components (LWC), Lightning Message Service (LMS), Platform Events, Custom Metadata Types, SFDX CLI, Jest (`@salesforce/sfdx-lwc-jest`).

## Global Constraints
- All Apex classes must enforce strictly FLS/CRUD using `Security.stripInaccessible` or `WITH USER_MODE`.
- All Apex methods exposed to LWC must be `@AuraEnabled(cacheable=true)` or `@AuraEnabled` with robust exception wrapping (`AuraHandledException`).
- Apex trigger framework must prevent reentrancy and support bulk processing up to 200+ records.
- LWC components must be modular, use LDS or Apex service gracefully, and communicate via LMS (`orchestratorChannel`).
- Test coverage for Apex must exceed 90% with negative, bulk, and mock scenarios.
- LWC Jest tests must test rendering, event handling, and LMS message publishing/subscribing.

---

### Task 1: SFDX Project Scaffolding & Configuration Setup

**Files:**
- Create: `troubleshoot-lwc/sfdx-project.json`
- Create: `troubleshoot-lwc/package.json`
- Create: `troubleshoot-lwc/jest.config.js`
- Create: `troubleshoot-lwc/config/project-scratch-def.json`
- Create: `troubleshoot-lwc/force-app/main/default/messageChannels/orchestratorChannel.messageChannel-meta.xml`

**Interfaces:**
- Consumes: Standard Salesforce DX project structure
- Produces: SFDX metadata definitions, npm build scripts, Jest test environment, Lightning Message Channel (`orchestratorChannel`)

- [ ] **Step 1: Write SFDX Project Config (`sfdx-project.json`)**
- [ ] **Step 2: Write Node package.json with sfdx-lwc-jest setup**
- [ ] **Step 3: Write Jest configuration (`jest.config.js`)**
- [ ] **Step 4: Create Lightning Message Channel (`orchestratorChannel.messageChannel-meta.xml`)**
- [ ] **Step 5: Verify project configuration by initializing dependencies**

---

### Task 2: Custom Objects, Fields, Platform Events & Permission Sets

**Files:**
- Create: `troubleshoot-lwc/force-app/main/default/objects/Operation_Task__c/Operation_Task__c.object-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/objects/Operation_Task__c/fields/Subject__c.field-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/objects/Operation_Task__c/fields/Status__c.field-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/objects/Operation_Task__c/fields/Priority__c.field-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/objects/Operation_Task__c/fields/Category__c.field-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/objects/Operation_Task__c/fields/Progress__c.field-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/objects/Operation_Task__c/fields/Target_Date__c.field-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/objects/Operation_Task__c/fields/Execution_Payload__c.field-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/objects/Application_Log__c/Application_Log__c.object-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/objects/Application_Log__c/fields/Source_Class__c.field-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/objects/Application_Log__c/fields/Log_Level__c.field-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/objects/Application_Log__c/fields/Message__c.field-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/objects/Application_Log__c/fields/Stack_Trace__c.field-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/objects/Operation_Event__e/Operation_Event__e.object-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/objects/Operation_Event__e/fields/Operation_Id__c.field-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/objects/Operation_Event__e/fields/Status__c.field-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/objects/Operation_Event__e/fields/Message__c.field-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/objects/Log_Event__e/Log_Event__e.object-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/objects/Log_Event__e/fields/Source__c.field-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/objects/Log_Event__e/fields/Level__c.field-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/objects/Log_Event__e/fields/Message__c.field-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/objects/Log_Event__e/fields/StackTrace__c.field-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/permissionsets/Enterprise_Orchestrator_Admin.permissionset-meta.xml`

**Interfaces:**
- Consumes: SFDX Custom Object metadata schema
- Produces: Data persistence structures for tasks, logs, platform events, and security permission sets

- [ ] **Step 1: Write Operation_Task__c object & field metadata**
- [ ] **Step 2: Write Application_Log__c object & field metadata**
- [ ] **Step 3: Write Operation_Event__e and Log_Event__e Platform Events**
- [ ] **Step 4: Write Enterprise_Orchestrator_Admin Permission Set**

---

### Task 3: Apex Enterprise Core Framework (Logger, Trigger Handler, Selector Layer, Domain Layer, Queueable Chain)

**Files:**
- Create: `troubleshoot-lwc/force-app/main/default/classes/Logger.cls`
- Create: `troubleshoot-lwc/force-app/main/default/classes/Logger.cls-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/triggers/LogEventTrigger.trigger`
- Create: `troubleshoot-lwc/force-app/main/default/triggers/LogEventTrigger.trigger-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/classes/TriggerHandler.cls`
- Create: `troubleshoot-lwc/force-app/main/default/classes/TriggerHandler.cls-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/classes/OperationTaskSelector.cls`
- Create: `troubleshoot-lwc/force-app/main/default/classes/OperationTaskSelector.cls-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/classes/OperationTaskDomain.cls`
- Create: `troubleshoot-lwc/force-app/main/default/classes/OperationTaskDomain.cls-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/triggers/OperationTaskTrigger.trigger`
- Create: `troubleshoot-lwc/force-app/main/default/triggers/OperationTaskTrigger.trigger-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/classes/OperationBatchExecutor.cls`
- Create: `troubleshoot-lwc/force-app/main/default/classes/OperationBatchExecutor.cls-meta.xml`

**Interfaces:**
- Consumes: Custom Objects (`Operation_Task__c`, `Application_Log__c`) & Platform Events (`Log_Event__e`, `Operation_Event__e`)
- Produces: `Logger.error()`, `Logger.info()`, `OperationTaskSelector.getTasksWithFilters()`, `OperationTaskDomain` validation, `OperationBatchExecutor` Queueable job chaining.

- [ ] **Step 1: Implement Logger async Platform Event logging framework**
- [ ] **Step 2: Implement LogEventTrigger for persistent error capture**
- [ ] **Step 3: Implement reentrancy-safe TriggerHandler base class**
- [ ] **Step 4: Implement OperationTaskSelector with Dynamic SOQL and FLS stripping**
- [ ] **Step 5: Implement OperationTaskDomain logic and OperationTaskTrigger**
- [ ] **Step 6: Implement OperationBatchExecutor Queueable chain with Platform Event progress emission**

---

### Task 4: Apex Service Layer & Aura Controller (`OrchestratorService`, `OrchestratorController`, Seed Data Generator)

**Files:**
- Create: `troubleshoot-lwc/force-app/main/default/classes/OrchestratorService.cls`
- Create: `troubleshoot-lwc/force-app/main/default/classes/OrchestratorService.cls-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/classes/OrchestratorController.cls`
- Create: `troubleshoot-lwc/force-app/main/default/classes/OrchestratorController.cls-meta.xml`

**Interfaces:**
- Consumes: `OperationTaskSelector`, `OperationTaskDomain`, `OperationBatchExecutor`, `Logger`
- Produces: Aura-enabled endpoints (`getOrchestrationTasks`, `getAnalyticsSummary`, `executeBatchTasks`, `reassignTasks`, `seedSampleData`, `clearAllTasks`) for LWC consumption.

- [ ] **Step 1: Implement OrchestratorService business operations & Seed Data Generator**
- [ ] **Step 2: Implement OrchestratorController `@AuraEnabled` adapter methods with `AuraHandledException` handling**

---

### Task 5: Comprehensive Apex Unit Test Suite

**Files:**
- Create: `troubleshoot-lwc/force-app/main/default/classes/Test_Logger.cls`
- Create: `troubleshoot-lwc/force-app/main/default/classes/Test_Logger.cls-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/classes/Test_OperationTaskSelector.cls`
- Create: `troubleshoot-lwc/force-app/main/default/classes/Test_OperationTaskSelector.cls-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/classes/Test_OperationTaskDomain.cls`
- Create: `troubleshoot-lwc/force-app/main/default/classes/Test_OperationTaskDomain.cls-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/classes/Test_OperationBatchExecutor.cls`
- Create: `troubleshoot-lwc/force-app/main/default/classes/Test_OperationBatchExecutor.cls-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/classes/Test_OrchestratorController.cls`
- Create: `troubleshoot-lwc/force-app/main/default/classes/Test_OrchestratorController.cls-meta.xml`

**Interfaces:**
- Consumes: Apex framework classes
- Produces: 95%+ test coverage, bulkification verification, negative scenario validation

- [ ] **Step 1: Write Test_Logger tests**
- [ ] **Step 2: Write Test_OperationTaskSelector tests**
- [ ] **Step 3: Write Test_OperationTaskDomain trigger & reentrancy tests**
- [ ] **Step 4: Write Test_OperationBatchExecutor queueable tests**
- [ ] **Step 5: Write Test_OrchestratorController Apex Aura controller tests**

---

### Task 6: Custom Datatable LWC Component (`customDatatable`)

**Files:**
- Create: `troubleshoot-lwc/force-app/main/default/lwc/customDatatable/customDatatable.js`
- Create: `troubleshoot-lwc/force-app/main/default/lwc/customDatatable/customDatatable.js-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/lwc/customDatatable/statusBadgeTemplate.html`
- Create: `troubleshoot-lwc/force-app/main/default/lwc/customDatatable/progressBarTemplate.html`

**Interfaces:**
- Consumes: `LightningDatatable` module
- Produces: Custom datatable element with custom status badge and progress bar cell types

- [ ] **Step 1: Create HTML cell templates for status badges and progress bars**
- [ ] **Step 2: Extend LightningDatatable in customDatatable JS registering custom types**
- [ ] **Step 3: Define component metadata xml**

---

### Task 7: Filter Bar LWC Component (`orchestratorFilterBar`)

**Files:**
- Create: `troubleshoot-lwc/force-app/main/default/lwc/orchestratorFilterBar/orchestratorFilterBar.html`
- Create: `troubleshoot-lwc/force-app/main/default/lwc/orchestratorFilterBar/orchestratorFilterBar.js`
- Create: `troubleshoot-lwc/force-app/main/default/lwc/orchestratorFilterBar/orchestratorFilterBar.css`
- Create: `troubleshoot-lwc/force-app/main/default/lwc/orchestratorFilterBar/orchestratorFilterBar.js-meta.xml`

**Interfaces:**
- Consumes: `orchestratorChannel` Lightning Message Channel via `@salesforce/messageChannel/orchestratorChannel__c`
- Produces: Interactive filters (Search, Status, Priority, Date Range), publishing filter updates to LMS

- [ ] **Step 1: Create template HTML with SLDS grid, inputs, comboboxes, and pills**
- [ ] **Step 2: Implement JS component with debounced search and LMS publishing**
- [ ] **Step 3: Add CSS styling**

---

### Task 8: Analytics Summary LWC Component (`orchestratorAnalyticsSummary`)

**Files:**
- Create: `troubleshoot-lwc/force-app/main/default/lwc/orchestratorAnalyticsSummary/orchestratorAnalyticsSummary.html`
- Create: `troubleshoot-lwc/force-app/main/default/lwc/orchestratorAnalyticsSummary/orchestratorAnalyticsSummary.js`
- Create: `troubleshoot-lwc/force-app/main/default/lwc/orchestratorAnalyticsSummary/orchestratorAnalyticsSummary.css`
- Create: `troubleshoot-lwc/force-app/main/default/lwc/orchestratorAnalyticsSummary/orchestratorAnalyticsSummary.js-meta.xml`

**Interfaces:**
- Consumes: `@AuraEnabled OrchestratorController.getAnalyticsSummary` & LMS filter messages
- Produces: Executive KPI dashboard summary cards (Total Tasks, High Priority Pending, Completion Rate %, Avg Progress)

- [ ] **Step 1: Create HTML card layout with SLDS stat cards and dynamic icons**
- [ ] **Step 2: Implement JS wire integration and LMS subscriber**
- [ ] **Step 3: Add CSS animation and badge styling**

---

### Task 9: Real-Time Event Monitor LWC Component (`orchestratorEventMonitor`)

**Files:**
- Create: `troubleshoot-lwc/force-app/main/default/lwc/orchestratorEventMonitor/orchestratorEventMonitor.html`
- Create: `troubleshoot-lwc/force-app/main/default/lwc/orchestratorEventMonitor/orchestratorEventMonitor.js`
- Create: `troubleshoot-lwc/force-app/main/default/lwc/orchestratorEventMonitor/orchestratorEventMonitor.css`
- Create: `troubleshoot-lwc/force-app/main/default/lwc/orchestratorEventMonitor/orchestratorEventMonitor.js-meta.xml`

**Interfaces:**
- Consumes: `lightning/empApi` streaming Platform Events (`/event/Operation_Event__e`)
- Produces: Streaming event log stream, toast alerts, connection state indicator, clear log actions

- [ ] **Step 1: Create template HTML displaying streaming event timeline feed**
- [ ] **Step 2: Implement JS with `subscribe`/`unsubscribe` empApi handlers and toast alerts**
- [ ] **Step 3: Add CSS styling for event log entries**

---

### Task 10: Core Task Grid LWC Component (`orchestratorTaskGrid`)

**Files:**
- Create: `troubleshoot-lwc/force-app/main/default/lwc/orchestratorTaskGrid/orchestratorTaskGrid.html`
- Create: `troubleshoot-lwc/force-app/main/default/lwc/orchestratorTaskGrid/orchestratorTaskGrid.js`
- Create: `troubleshoot-lwc/force-app/main/default/lwc/orchestratorTaskGrid/orchestratorTaskGrid.css`
- Create: `troubleshoot-lwc/force-app/main/default/lwc/orchestratorTaskGrid/orchestratorTaskGrid.js-meta.xml`

**Interfaces:**
- Consumes: `customDatatable`, `OrchestratorController` wire/imperative Apex, LMS `orchestratorChannel`
- Produces: Dynamic task datatable, inline cell editing, row actions, mass selection, batch execution, seed demo data button, LMS dispatching

- [ ] **Step 1: Create HTML with customDatatable, bulk action toolbar, pagination, and empty state**
- [ ] **Step 2: Implement JS with wire Apex, inline edit saving, row actions, LMS event listeners**
- [ ] **Step 3: Add CSS styling**

---

### Task 11: Main Orchestrator Hub Container App LWC (`orchestratorHub`)

**Files:**
- Create: `troubleshoot-lwc/force-app/main/default/lwc/orchestratorHub/orchestratorHub.html`
- Create: `troubleshoot-lwc/force-app/main/default/lwc/orchestratorHub/orchestratorHub.js`
- Create: `troubleshoot-lwc/force-app/main/default/lwc/orchestratorHub/orchestratorHub.css`
- Create: `troubleshoot-lwc/force-app/main/default/lwc/orchestratorHub/orchestratorHub.js-meta.xml`

**Interfaces:**
- Consumes: All child components (`orchestratorAnalyticsSummary`, `orchestratorFilterBar`, `orchestratorTaskGrid`, `orchestratorEventMonitor`)
- Produces: App container flexipage deployment target

- [ ] **Step 1: Create HTML container layout with SLDS page header and multi-column grid**
- [ ] **Step 2: Implement JS app container logic**
- [ ] **Step 3: Add CSS container styling**
- [ ] **Step 4: Configure component metadata XML with `lightning__AppPage`, `lightning__RecordPage`, `lightning__HomePage` targets**

---

### Task 12: Lightning App Page, Custom Tab & Flexipage Metadata

**Files:**
- Create: `troubleshoot-lwc/force-app/main/default/applications/Enterprise_Orchestrator.app-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/tabs/Enterprise_Orchestrator_Hub.tab-meta.xml`
- Create: `troubleshoot-lwc/force-app/main/default/flexipages/Enterprise_Orchestrator_Hub.flexipage-meta.xml`

**Interfaces:**
- Consumes: `orchestratorHub` LWC
- Produces: Full Salesforce Lightning App and Page ready to load in standard Salesforce Navigation

- [ ] **Step 1: Create Custom Tab metadata**
- [ ] **Step 2: Create Flexipage metadata embedding `orchestratorHub`**
- [ ] **Step 3: Create Lightning Application metadata**

---

### Task 13: LWC Jest Unit Test Suite & System Verification

**Files:**
- Create: `troubleshoot-lwc/force-app/main/default/lwc/orchestratorFilterBar/__tests__/orchestratorFilterBar.test.js`
- Create: `troubleshoot-lwc/force-app/main/default/lwc/orchestratorAnalyticsSummary/__tests__/orchestratorAnalyticsSummary.test.js`
- Create: `troubleshoot-lwc/force-app/main/default/lwc/orchestratorTaskGrid/__tests__/orchestratorTaskGrid.test.js`

**Interfaces:**
- Consumes: LWC components, `@salesforce/sfdx-lwc-jest`
- Produces: Verified unit tests for LWC DOM state, LMS publishing, and event dispatching

- [ ] **Step 1: Implement Jest test for orchestratorFilterBar**
- [ ] **Step 2: Implement Jest test for orchestratorAnalyticsSummary**
- [ ] **Step 3: Implement Jest test for orchestratorTaskGrid**
- [ ] **Step 4: Run Jest test suite and verify 100% pass rate**
- [ ] **Step 5: Create comprehensive README documentation showcasing architecture**

