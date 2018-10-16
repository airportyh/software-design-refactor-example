interface IUser {}

export class AlertService {
    public show(message: string) {}
}

export class RestService {

    public sendRequest(
        model: string, 
        method: "GET" | "POST" = "GET", 
        data?: any) {
        const url = "http://api.sweetdata.com/data/" + model;
        let options: RequestInit = {
            method: method,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        };
        if (data) {
            options.body = JSON.stringify(data);
        }
        return fetch(url, options)
            .then((response) => response.json());
    }

    public getUsers() {
        return this.sendRequest("user").then((data) => data.users);
    }

    public getCompanies() {
        return this.sendRequest("company").then((data) => data.companies);
    }

    public getVehicles() {
        return this.sendRequest("vehicle").then((data) => data.vehicles);
    }

    public saveUser(user) {
        return this.sendRequest("user", "POST", user).then((data) => data.user);
    }

    public saveCompany(company) {
        return this.sendRequest("company", "POST", company).then((data) => data.company);
    }

    public saveVehicle(vehicle) {
        return this.sendRequest("vehicle", "POST", vehicle).then((data) => data.vehicle);
    }
}

export class SomeUserComponent {

    users: IUser[];

    constructor(
        private restService: RestService,
        private alertService: AlertService
        ) { }

    ngOnInit(): void {
        this.restService.getUsers()
            .then((users) => {
                this.users = users;
            });
    }

    saveUser(user: IUser): void {
        this.restService.saveUser(user)
            .then((savedUser) => {
                this.alertService.show(`User ${savedUser.id} saved.`);
            });
    }

}
