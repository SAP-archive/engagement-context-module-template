# Module Template for SAP Hybris Service Engagement Context

This module template project can be used as a basis to develop the necessary UI Views and objects of your custom documents/objects in the engagement context (of SAP Hybris Service Engagement Center) application.  

The engagement context application uses the SAPUI5 version 1.36.x.



## Project Setup

This module template project contains the following necessary objects and is in state to run with few changes:  

* Header Area View: A sample implementation of header area view
* Action Area View: A sample implementation of action area view with 2 links, each invoking a work area view
* Work Area Views (2 views): Two sample implementation of work area views, one view is modelled as a crud view and another view modeled after a search view.
* BCD Helper: A sample implementation of Business Context Data Helper class
* i18n file: Property file containing number of text elements used in the project

Please follow below steps to embed the module template project in engagement context application.



### 1. Setup Business Context Configurations

The following steps to updating Business Context configurations are needed to embed the module template project:

* Launch builder UI of your tenant (https://builder.yaas.io/). Navigate to Modules configuration (Path: Your Tenant -> Engagement Center Settings -> Modules) and maintain the following settings and save.

		Module: Module_Template_App
		Module Name: Engagement Context Extension Module Template
		Active: True
		Module Base URL: https://localhost:8443/<URL-Path>
		Module Path: com.sap.engagementcontext.moduletemplate
		i18n URL: i18n/i18n.properties
>	Please change the URL (domain and port) as per your webserver configuration (see next step).

* Navigate to Header Area Views configuration (Path: Your Tenant -> Engagement Center Settings -> Business Context -> Header Area Views) and maintain the following settings and save.

		View ID: HeaderAreaView_Template
		Order: 3
		Column Span: 1
		View Path: com.sap.engagementcontext.moduletemplate.view.HeaderAreaView
		Description: Module Template - Header Area View
		Active: True

* Navigate to Action Area Views configuration (Path: Your Tenant -> Engagement Center Settings -> Business Context -> Action Area Views) and maintain the following settings and save.

		View ID: ActionAreaView_Template
		Order of Views: << Please specify the next free number in your tenant >>
		Column Span: 1
		View Path: com.sap.engagementcontext.moduletemplate.view.ActionAreaMenu
		Description: Module Template - Action Area View
		Active: True
	
* Navigate to Work Area Views configuration (Path: Your Tenant -> Engagement Center Settings -> Business Context -> Work Area Views) and maintain the following settings for 2 views (below 2 tables) and save

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
	
* Navigate to Business Document Types configuration (Path: Your Tenant -> Engagement Center Settings -> Business Context -> Business Document Types) and maintain the following settings and save

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



### 2. Setup and run project on local environment

The following steps show how to update the module template project based on the Business Context Configurations to run it on the local environment:

* Clone and import the project to your eclipse workspace

* Update Item handler class for Business Context with configured Business Document Type Key. 
	* Open BCD Helper class(bcdhelper.js) under folder “helper”
	* Search and replace `<< YOUR BUSINESS DOCUMENT TYPE KEY >>` with configured business document type key `Module_Template_ItemKey`.
	* Save

* Update Action Area menu view controller with Business Document Type and Work Area View ID
	* Open Action Area menu view controller (ActionAreaMenu.controller.js) under folder “controller”
	* Search and replace `<< YOUR BUSINESS DOCUMENT TYPE >>` with configured business document type key `Module_Template_BDT`.
	* Search and replace `<< YOUR WORK AREA ID >>` with configured business document type key `WorkAreaView_Template_2`.
	* Save

* Update Work Area view controller with Business Document Type
	* Open Work Area menu view controller (WorkAreaView2.controller.js) under folder “controller”
	* Search and replace `<< YOUR BUSINESS DOCUMENT TYPE >>` with configured business document type key `Module_Template_BDT`
	* Save

* Host your project in a local server of choice. The local server must be accessible through a HTTPS channel that enables cross-origin resource sharing.
> One way how to host it is to create a Maven web application project, clone this module template project, place it in the maven project and host this in a tomcat server. You can find more instrunctions [here][1].

* Launch Engagement Center from the same tenant where above configurations are maintained. 



## License

See the License file for complete license information.



[1]: https://help.sap.com/saphelp_nw74/helpdata/en/d5/6826f550d74e02b8d4b32cb264de52/content.htm?original_fqdn=help.sap.de