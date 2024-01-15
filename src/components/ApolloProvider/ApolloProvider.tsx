"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
    const client = new ApolloClient({
        uri: `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
        cache: new InMemoryCache(),
    });

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default Provider;