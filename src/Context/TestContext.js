import React, { createContext, useState } from 'react'
export let TestContext = createContext();

export default function TestContextProvider(props) {
    const [Tester, setTester] = useState(100000)
    function changeTester() {
        setTester(Math.random)
    }
    return <TestContext.Provider value={{ Tester, changeTester }}>
        {props.children}
    </TestContext.Provider>


}
