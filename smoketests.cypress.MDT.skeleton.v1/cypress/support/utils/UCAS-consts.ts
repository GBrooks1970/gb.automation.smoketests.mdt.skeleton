export class UCAS {

    /*
    https://docs.cypress.io/api/commands/get
    
    Option	                Default	                                Description
    -----	                -------	                                -----------
    log	                    true	                                Displays the command in the Command log
    timeout	                defaultCommandTimeout(4000)               Time to wait for cy.get() to resolve before timing out
    withinSubject	        null	                                Element to search for children in. If null, search begins from root-level DOM element
    includeShadowDom	    includeShadowDom config option value	Whether to traverse shadow DOM boundaries and include elements within the shadow DOM in the yielded results.
    */
   
    static readonly getTimeout = 6000;
    static readonly getOptions = { timeout: UCAS.getTimeout };

    static readonly clickTimeout = 6000;
    static readonly clickOptions = { timeout: UCAS.clickTimeout };

    static readonly urlTimeout = 6000;
    static readonly urlOptions = { timeout: UCAS.urlTimeout };

	static readonly constants = {

		AddressType: {
			UKAddress: '[UKAddress]',                                    				//| Indicates that a UKAddress is required
			nonUKAddress: '[Non-UKAddress]',                             				//| Indicates that a Non-UKAddress is required
			BFPOAddress: '[BFPOAddress]'                                				//| Indicates that a BFPOAddress is required
		},
		FeePaidStatus: {                                                                //| Indicates the Topaz Applications Fee Paid Status
			PaidInFull: 'Paid in full',
			PartiallyPaid: 'Partially Paid',
			NotPaid: 'Not Paid'
		},
		Schemes: {                                                                      //| Indicates the Topaz Application Schemes
			UCAS: 'UCAS',
			CUKAS: 'CUKAS',
			GTTR: 'GTTR'
		},
		TopazEventTypes: {                                                              //| Indicates the Topaz Event Types
			All: 'All Details',
    		System: 'System Generated Events',
    		Letters: 'Letters',
    		Payments: 'Payments',
    		User: 'User Notes'
		},
		StudyType: {                                                                    //| Indicates the Type of Study for POE
			FullTime: 'Full time',
			PartTime: 'Part time',
			Sandwich: 'Sandwich'
		},
		AdvRefNoInfoToEnter: '[NoInfoToEnter]',                                         //| Indicates that the No Information to enter checkbox should be checked for a Reference Section in the Adviser Portal
		AdviserAppStatus: {                                                             //| Indicates the Adviser Portal Application Management Application Statuses
			inProgress: 'In progress',
			awaitingApproval: 'Awaiting approval',
			approved: 'Approved',
			sent: 'Sent',
			deleted: 'Deleted'
		},
		AdviserApplicationDetailsActionMenuOptions: {                                   //| Indicates the Adviser Portal Application Management options from the Application Details Actions menu
			approve: 'Approve application',
			unapprove: 'Unapprove application',
			delete: 'Delete application',
			undelete: 'Undelete application',
			savePDFWithRef: 'Save PDF (with reference)',
		},
		AdviserApplicationListActionMenuOptions: {                                      //| Indicates the Adviser Portal Application Management options from the Application List Actions menu
			sendEmail: 'Send email',
			createPDFs: 'Create PDFs'
		},
		AdviserApplicationListDownloadMenuOptions: {                                    //| Indicates the Adviser Portal Application Management options from the Application List Actions menu
			overview: 'Overview',
			PDFs: 'PDFs'
		},
		AdviserAppManageUpdateTypes: {                                                  //| Indicates the Types of Update that can be made to an Application in the Application Management section of the Adviser Portal 
			undeleted: 'Undeleted',
			deleted: 'Deleted',
			approved: 'Approved',
			unapproved: 'Unapproved',
			qualsChecked: 'Qualifications Checked',
			qualsUnchecked: 'Qualifications Unchecked',
			emailSent: 'Email Sent',
			saveReference: 'Save Reference',
			markReferenceComplete: 'Complete Reference',
			editReference: 'Edit Reference',
			unapproveReference: 'Unapprove Reference',
			approveReference: 'Approve Reference',
			predictedGradesComplete: 'Complete Predicted Grades',
			saveAdviserNotes: 'Save Adviser Notes'
		},
		AdviserRefStatus: {                                                             //| Indicates the Adviser Portal Application Management Application Reference Statuses
			inProgress: 'In progress',
			awaitingApproval: 'Awaiting approval',
			approved: 'Approved'
		},
		AdviserRefSection: {                                                            //| Indicates the Adviser Portal Application Management Application Reference Sections
			refereeName: 'RefereeName',
			generalStatement: 'ReferenceGeneralStatement',
			extenuatingCircumstances: 'ReferenceExtenuatingCircumstances',
			other: 'ReferenceOther',
			datesUnavailable: 'ReferenceDatesUnavailable'
		},
		AdviserCentreManUpdateTypes: {                                                  //| Indicates the Types of Update that can be made to Centre in the Centre Management section of the Adviser Portal 
			addReferee: 'Referee Added',
			removeReferee: 'Referee Removed',
			addGroup: 'Group Added',
			removeGroup: 'Group Removed',
			qualificationAdded: 'Qualification Added',
			qualificationRemoved: 'Qualification Removed',
			feePaymentMethodUpdated: 'Fee Payment Method Updated',
			buzzwordUpdated: 'Buzzword Updated',
			referenceTemplateTextUpdated: 'Reference Template Text Updated',
			centreDetailsUpdated: 'Centre Details Updated'                               
		},
		AdviserTrackOffersDecisionsUpdateTypes: {					                    //| Indicates the Types of Update that can be made in the Track Offers and Decisions section of the Adviser Portal 
			emailSent: 'Email Sent',
		}
	};
};