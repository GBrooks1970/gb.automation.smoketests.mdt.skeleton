import { dateFormat } from '../../utils/date-utils';

export interface FieldDetail_Base {
    Name: string; // Data table column Name.
    Selector: string; // Selector for the field.
    ValueType: string; // Type of value within the field.
}

export interface FieldDetail_Input extends FieldDetail_Base {
    InputType: string; // Type of input to field.
    ClearBeforeInput?: boolean; //Clear field before insert for some selectorTypes
    PredictiveEntrySelector?: string; // Selector for autofill action.
    InputWaitBefore?: number; // Optional pre-action wait time.
    InputWaitAfter?: number; // Optional post-action wait time.
    dateFormat?: string; // Date format.
    defaultValue?: string; // Value for [BLANK] input type.
    radioButtonSelectors?: {
        options: RadioButtonSelector[];
    };
    InputProcess?: string; // Input process to perform against page
}

export interface FieldDetail_Assert extends FieldDetail_Base {
    AssertionProcess: string; // Assertion to perform against page
    AssertionTarget: string; // Target property for assertion.
    AssertionType: string; // Assertion type.
    dateFormat?: string; // Date format.
    defaultValue?: string; // Value for [BLANK] assertion.
    AssertionAttribute?: string; // Attribute for assertion. Used when AssertionTarget is attr
    radioButtonSelectors?: {
        options: RadioButtonSelector[];
    };
}

export interface RadioButtonSelector {
    Name: string; // Value for radio button.
    Selector: string; // Selector for radio button.
}

export const FieldDetail = {
    AssertionTarget: {
        text: 'text',
        value: 'value',
        attr: 'attr',
        selected: 'selected',
        checked: 'checked'
    },

    AssertionType: {
        equal: 'equal',
        contains: 'contains',
        isTrue: 'isTrue',
        isFalse: 'isFalse'
    },

    InputType: {
        Fill: 'Fill',
        Dropdown: 'Dropdown',
        PredictiveEntry: 'PredictiveEntry',
        RadioButton: 'RadioButton',
        Checkbox: 'Checkbox',
        Numeric: 'Numeric',
        Alpha: 'Alpha'
    },

    AssertionProcess: {
        WithinPageElement: 'WithinPageElement',
        WithinRadioButtonElement: 'WithinRadioButtonElement'
    },

    ValueType: {
        Date: 'Date',
        AlphaNumeric: 'ALPHA-NUMERIC',
        Numeric: 'Numeric',
    },
    DateFormat: dateFormat,

    InputProcess: {
        UGApply: 'UGApply',
        UCApply: 'UCApply',
        Topaz: 'Topaz'
    },
};

export interface FieldData {
    Name: string;
    value: string;
};
export interface ErrorData {
    Description: string;
    Selector: string;
};
