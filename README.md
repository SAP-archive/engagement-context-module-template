# Module Template for SAP Hybris Service Engagement Context

This module template project can be used as the basis for developing the necessary UI Views and objects for your custom documents/objects in the engagement context (of SAP Hybris Service Engagement Center) application.  

The engagement context application uses SAPUI5 version 1.36.x.



## Project Setup

This module template project contains the following objects and can be run with only a small number of changes:  

* __Header Area View__: A sample implementation of the header area view
* __Action Area View__: A sample implementation of the action area view with two links, each invoking a work area view
* __Work Area Views (2 views)__: Two sample implementations of work area views. One view is modeled as a CRUD view and the other view is modeled as a search view.
* __BCD Helper__: A sample implementation of the Business Context Data Helper class
* __i18n file__: A property file containing a number of the text elements used in the project

Follow the steps below to embed the module template project in the engagement context application.



### 1. Setup Business Context Configurations

The following steps show you how to update the Business Context configurations needed to embed the module template project:

* Launch the builder UI of your tenant (https://builder.yaas.io/).
* __Modules Configuration__ Navigate to _< Your Tenant >_ -> _Engagement Center Settings_ -> _Modules_, click __ADD ROW__ to maintain the following settings, click __OK__ to apply them, and then click __SAVE__.

		Module: Module_Template_App
		Module Name: Engagement Context Extension Module Template
		Active: True
		Module Base URL: https://localhost:8443/<URL-Path>
		Module Path: com.sap.engagementcontext.moduletemplate
		i18n URL: i18n/i18n.properties
>	Please change the URL (domain and port) according to your webserver configuration (see next step).

* __Header Area Views configuration__ _< Your Tenant >_ -> _Engagement Center Settings_ -> _Business Context_ -> _Header Area Views_ to maintain the following settings, click __OK__ to apply them, and then click __SAVE__.

		View ID: HeaderAreaView_Template
		Order: 3
		Column Span: 1
		View Path: com.sap.engagementcontext.moduletemplate.view.HeaderAreaView
		Description: Module Template - Header Area View
		Active: True

* __Action Area Views configuration__ Navigate to _< Your Tenant >_ -> _Engagement Center Settings_ -> _Business Context_ -> _Action Area Views_ to maintain the following settings, click __OK__ to apply them, and then click __SAVE__.

		View ID: ActionAreaView_Template
		Order of Views: << Please specify the next free number in your tenant >>
		Column Span: 1
		View Path: com.sap.engagementcontext.moduletemplate.view.ActionAreaMenu
		Description: Module Template - Action Area View
		Active: True

* __Work Area Views configuration__ Navigate to _< Your Tenant >_ -> _Engagement Center Settings_ -> _Business Context_ -> _Work Area Views_ to maintain the following settings, click __OK__ to apply them, and then click __SAVE__.

		View Name: WorkAreaView_Template_1
		View Path: com.sap.engagementcontext.moduletemplate.view.WorkAreaView1
		Icon: sap-icon://cloud
		Description: Module Template - Work Area View 1
		Active: True
		One Instance Only: False
		Closable: True

		View Name: WorkAreaView_Template_2
		View Path: com.sap.engagementcontext.moduletemplate.view.WorkAreaView2
		Icon: sap-icon://cloud
		Description: Module Template - Work Area View 2
		Active: True
		One Instance Only: True
		Closable: True

* __Business Document Types configuration__ Navigate to  _< Your Tenant >_ -> _Engagement Center Settings_ -> _Business Context_ -> _Business Document Types_ to maintain the following settings, click __OK__ to apply them, and then click __SAVE__.

		Key of Business Document Type: Module_Template_BDT
		Text ID (Singular): BUSDOCTYPE_MODULETEMPLATE
		Text ID (Plural): BUSDOCTYPE_MODULETEMPLATES
		Active: True
		Item Handler class of Business Context: com.sap.engagementcontext.moduletemplate.helper.bcdhelper
		Item Key of Business Context:Module_Template_ItemKey
		Module: Module_Template_App
		Business Document Type: Module Template
		View Name (Create): WorkAreaView_Template_1
		View Name (Edit): WorkAreaView_Template_1
		View Name (Display): WorkAreaView_Template_1
		Record in Interaction Log: True
		Service URI for Recent Items:
		Display Order for Recent Items:
		View Name (Search): WorkAreaView_Template_2
		Action Area View: ActionAreaView_Template



### 2. Setup and Run the Project in your Local Environment

The following steps show you how to update the module template project based on your Business Context configurations and run it in a local environment:

* Clone this repository to your local machine and import the project from the repository into Eclipse.

* Update the Item handler class for Business Context with the configured Business Document Type Key.
	* Open the BCD Helper class (in the file _bcdhelper.js_) under the folder “helper”
	* Search for and replace `<< YOUR BUSINESS DOCUMENT TYPE KEY >>` with the configured business document type key `Module_Template_ItemKey`.
	* Save

* Update the Action Area menu view controller with the Business Document Type and Work Area View ID
	* Open the Action Area menu view controller (in the file _ActionAreaMenu.controller.js_) under the folder “controller”
	* Search for and replace `<< YOUR BUSINESS DOCUMENT TYPE >>` with the configured business document type key `Module_Template_BDT`.
	* Search for and replace `<< YOUR WORK AREA ID >>` with the configured business document type key `WorkAreaView_Template_2`.
	* Save

* Update the Work Area view controller with the Business Document Type
	* Open the Work Area menu view controller (in the file _WorkAreaView2.controller.js_) under the folder “controller”
	* Search for and replace `<< YOUR BUSINESS DOCUMENT TYPE >>` with the configured business document type key `Module_Template_BDT`
	* Save

* Host your project on a local server of your choice. The local server must be accessible through a HTTPS channel that enables cross-origin resource sharing.
> One way to host it is to create a Maven web application project, clone this module template project, place it in the maven project and host this on a Tomcat server. You can find more instructions [here][1].

* Launch the engagement center from the tenant where you maintained the above configurations.

## Further Information

You can find more information on configuring the engagement context in the Administrator's Guide for SAP Hybris Service Engagement Center on the [SAP Help Portal][2].

## How to contact us

If you have questions or suggestions then please create an issue in this Github repository.

## License

See the License file for complete license information.



[1]: https://help.sap.com/saphelp_nw74/helpdata/en/d5/6826f550d74e02b8d4b32cb264de52/content.htm?original_fqdn=help.sap.de
[2]: https://uacp2.hana.ondemand.com/viewer/p/SAP_HYBRIS_SERVICE_ENGAGEMENT_CENTER
