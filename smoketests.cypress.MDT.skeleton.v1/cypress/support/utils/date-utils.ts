let yyyy: string;
let mm: string;
let dd: string;
let monthName: string;
let formattedDate: string;

export const dateFormat = {
  dd: 'dd',
  mm: 'mm',
  yyyy: 'yyyy',
  yyyymmdd: 'yyyy-mm-dd',
  ddmmyyyy: 'dd/mm/yyyy',
  monthyyyy: 'Month yyyy',
  month: 'Month',
};

export class DateUtil {
  static formatDateToString(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  static formatDateStringToString(dateString: string, providedFormat: string, expectedFormat: string): string {
    let parts: string[] = [];


    switch (providedFormat) {
      case dateFormat.yyyymmdd: {
        {
          parts = dateString.split('-');
          if (parts.length === 3) {
            [yyyy, mm, dd] = parts;
          } else {
            throw new Error(`${this.formatDateStringToString.name} : dateString: ${dateString} is not in the expected provided format ${dateFormat.yyyymmdd}`);
          };
        };
        break;
      }
      case dateFormat.ddmmyyyy: {
        {
          parts = dateString.split('/');
          if (parts.length === 3) {
            [dd, mm, yyyy] = parts;
          } else {
            throw new Error(`${this.formatDateStringToString.name} : dateString: ${dateString} is not in the expected provided format ${dateFormat.ddmmyyyy}`);
          };
        };
        break;
      }
      default: {
        throw new Error(`${this.formatDateStringToString.name} : providedFormat: ${providedFormat} is not in expected formats ${dateFormat.ddmmyyyy} or ${dateFormat.yyyymmdd}`);
      }
    };

    switch (expectedFormat) {
      case dateFormat.dd: {
        formattedDate = `${dd}`;
        break;
      }
      case dateFormat.mm: {
        formattedDate = `${mm}`;
        break;
      }
      case dateFormat.yyyy: {
        formattedDate = `${yyyy}`;
        break;
      }
      case dateFormat.yyyymmdd: {
        formattedDate = `${yyyy}-${mm}-${dd}`;
        break;
      }
      case dateFormat.ddmmyyyy: {
        formattedDate = `${dd}/${mm}/${yyyy}`;
        break;
      }
      case dateFormat.monthyyyy: {
        monthName = new Date(dateString).toLocaleString('en-GB', { month: 'long' });
        formattedDate = `${monthName} ${yyyy}`;
        break;
      }
      default: {
        throw new Error(`expectedFormat: ${expectedFormat} is not in expected formats ${dateFormat.ddmmyyyy}, ${dateFormat.yyyymmdd} or ${dateFormat.monthyyyy}`);
      }
    };
    
    cy.log(`${this.formatDateStringToString.name} : Date format changed from "${dateString}" to "${formattedDate}"`);

    return formattedDate;
  }
  
}