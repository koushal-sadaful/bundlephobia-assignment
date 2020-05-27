import {createTestStore} from "../testStoreFactory";
import {configure, mount} from 'enzyme';
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from "react-test-renderer";

configure({adapter: new Adapter()});
jest.mock('axios');
jest.useFakeTimers()

export async function thenRerenderWrapper(wrapper, timeout = 1) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (wrapper !== undefined) wrapper.update()
            resolve()
        }, timeout)
    })
}


export async function mountWrapper(componentUnderTest) {
    const div = document.createElement('div')
    document.body.appendChild(div)

    const wrapper = mount(
        <Provider store={createTestStore()}>
            <MemoryRouter>
                {componentUnderTest}
            </MemoryRouter>
        </Provider>
        , {attachTo: div})

    return wrapper
}

export function runTheSnapshotTest(componentUnderTest) {
    const component = renderer.create(componentUnderTest);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
}