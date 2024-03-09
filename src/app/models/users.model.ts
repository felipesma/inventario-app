export class User {

    static fromFirebase( { userId, name, email }: {userId: string, name: string, email: string } ) {
        return new User(userId, name, email)
    }

    constructor( 
        public userId: string,
        public name: string,
        public email: string,
     ) {}
}