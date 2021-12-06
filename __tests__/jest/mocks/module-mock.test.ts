import axios from "axios";
import Users from "../../../lib/mock-target";

jest.mock('axios');

test('should fetch some users', () => {
    const users = [{ name: 'Bob' }];
    const resp = { data: users };
    // @ts-ignore
    axios.get.mockResolvedValue(resp);

    return Users.all().then(data => expect(data).toEqual(users));
})