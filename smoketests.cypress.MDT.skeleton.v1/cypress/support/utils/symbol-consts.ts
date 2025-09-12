
//### Conventions and representations Used ###
//
//Symbol Guidlines 																	| Examples
//------------------------------------------------------------------------------	| ------------------------------- 
//Use of one word 																	| CAPITALS 
//More than one word use Pascal Case 												| FirstName and LastName
//Two part token, separate the differentiator aplha/numeric 						| CharSet XXX
//Avoid Kebab Case or Snake case, as can cause issues when trying to parse	    	| kebab-case or snake_case
//
//Symbol  						                                					//| Explanation
//-------------------------------                               					//| ------------------------------- 
export class SymbolsOBS {
	static readonly OnyxUserId = '[OnyxUserId]';                  	    			//| The Onyx User Id used for testing 
	static readonly OnyxManagerUserId = '[OnyxManagerUserId]';          			//| The Onyx Manager User Id used for testing
	static readonly OnyxDefaultPassword = '[OnyxDefaultPassword]';      			//| The default Password for Onyx test users
	static readonly QualManagerUserId = '[QualManagerUserId]';          			//| The Qualifications Manager User Id used for testing
	static readonly QualManagerPassword = '[QualManagerPassword]';      			//| The default Password for Qualifications Manager test users
	static readonly TopazUserId = '[TopazUserId]';          						//| The Topaz User Id used for testing
	static readonly TopazPassword = '[TopazPassword]';        	 					//| The default Password for Topaz test users

	static readonly VALID_fuzzysearchend = '[VALID] +fuzzysearchend:';              //| Indicates valid data + amended with substring for fuzzy search (end of value)
	static readonly VALID_fuzzysearchmiddle = '[VALID] +fuzzysearchmiddle:';        //| Indicates valid data + amended with substring for fuzzy search (middle of value)


	static readonly AdvRefNoInfoToEnter = '[NoInfoToEnter]'                         //| Indicates that the No Information to enter checkbox should be checked for a Reference Section in the Adviser Portal
	static readonly maxSupportedCycleYear = '[MaxSupportedCycle]'                 	//| Indicates the Maximum Supported Cycle Year 

};
export class SymbolsDT {
	static readonly VALID = '[VALID]'; //| Enter or Select any valid data for field
	static readonly UPDATEVALID = '[UPDATEVALID]'; //| Indicates an update to valid data for data field 
	static readonly UPDATEINVALID = '[UPDATEINVALID]'; //| Indicates an update to NON valid data for data field 
	static readonly BLANK = '[BLANK]'; //| Indicates the field should be blank/empty entry
	static readonly UPDATEBLANK = '[UPDATEBLANK]'; //| Indicates an update from some value to a blank/empty entry
	static readonly IGNORE = '[IGNORE]'; //| Indicates the field should be ignored from data entry or data updates. 
}
export class SymbolsDate {
	///TEMPORARY UNTIL ALL CODE REFACTORS THESE TOKENS OUT
	static readonly TODAY = '[TODAY]'; //| Current system date
	static readonly TOMORROW = '[TOMORROW]'; //| Tomorrow's  system date 
	static readonly YESTERDAY = '[YESTERDAY]'; //| Yesterday's system date

	///
	static readonly BracketedTokenRegex = /^\[.*\]$/; //| Regex pattern for tokens enclosed in brackets (All tokens MUST start and end with these)
	static readonly TokenDate = {
		FullRegex: /^(?<anchorDate>TODAY|TOMORROW|YESTERDAY)(?<adjustTokens>([+-]\d+(YEAR|MONTH|DAY))*)$/,
		RangeRegex: /^(START|END)-(\w+)-(\d{4})$/,
	};
	static readonly TokenDateInnerSectionRegex =  /(?<token>(?<sign>[+-])(?<adjustValue>\d+)(?<dateUnit>YEAR|MONTH|DAY))/g;
}
export class SymbolsDS {
	// Constants for the different types of characters
	public static readonly ALPHA = 'ALPHA'; //| Aplha  characters
	public static readonly NUMERIC = 'NUMERIC'; //| Numeric characters
	public static readonly PUNCTUATION = 'PUNCTUATION'; //| punctuation characters
	public static readonly SPECIAL = 'SPECIAL'; //| special characters
	public static readonly LINES = 'LINES'; //| indicates lines of repeated tokens

	// Regular expression to match the Dynamic String token format
	// regex also handles the optional LINES-XXX part
	public static readonly DynamicStringRegex = /\[(?<types>(?:(?:ALPHA|NUMERIC|PUNCTUATION|SPECIAL)(?:-(?!-))?)+)-(?<length>\d+|ALL)(?:-LINES-(?<lines>\d+))?\]/;
}