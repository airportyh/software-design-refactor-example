import * as pluralize from "pluralize";
interface IUser {}

export class AlertService {
    public show(message: string) {}
}

export class RestService {

    commonRequestOptions(): RequestInit {
        return {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        };
    }

    urlFor(model: string): string {
        return "http://api.sweetdata.com/data/" + model;
    }

    public get(model: string) {
        let options: RequestInit = this.commonRequestOptions();
        return fetch(this.urlFor(model), options)
            .then((response) => response.json())
            .then((data) => data[pluralize(model)]);
    }

    public post(model: string, data: any) {
        let options: RequestInit = this.commonRequestOptions();
        options.body = JSON.stringify(data);
        return fetch(this.urlFor(model), options)
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
