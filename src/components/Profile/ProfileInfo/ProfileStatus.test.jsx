import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("Profile status Component", () => {
    test("status in props in state", () => {
        const component = create(<ProfileStatus status="jopa" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("jopa");
    });
    test("span display with status", () => {
        const component = create(<ProfileStatus status="jopa" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });
    test("input not shown", () => {
        const component = create(<ProfileStatus status="jopa" />);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input");
        }).toThrow();
    });
});