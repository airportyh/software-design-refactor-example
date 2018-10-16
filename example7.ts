import * as pluralize from "pluralize";
interface IUser {}

export class AlertService {
    public show(message: string) {}
}

export class RestService {

    public get(
        model: string) {
        const url = "http://api.sweetdata.com/data/" + model;
        let options: RequestInit = {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        };
        return fetch(url, options)
            .then((response) => response.json())
            .then((data) => data[pluralize(model)]);
    }

    public post(
        model: string, 
        data: any) {
        const url = "http://api.sweetdata.com/data/" + model;
        let options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data)
        };
        return fetch(url, options)
            .then((response) => response.json())
            .then((data) => data[model]);
    }
}

export class SomeUserComponent {

    users: IUser[];

    constructor(
        private restService: RestService,
        private alertService: AlertService
        ) { }

    ngOnInit(): void {
        this.restService.get("user")
            .then((users) => {
                this.users = users;
            });
    }

    saveUser(user: IUser): void {
        this.restService.post("user", user)
            .then((savedUser) => {
                this.alertService.show(`User ${savedUser.id} saved.`);
            });
    }

}
