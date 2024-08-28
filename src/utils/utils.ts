export class CoreUtils {
    /**
     * Convert price to kobo
     * @param price
     */
    static convertPriceToKobo(price: number): number {
        return price * 100;
    }

    static numberWithCommas(value: number){
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    static removePlusSign(phoneNumber: string): string {
        return phoneNumber.replace(/^\+/, '');
    }
}
