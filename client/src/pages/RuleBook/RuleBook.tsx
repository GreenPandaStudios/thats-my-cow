
import React, { useEffect, useState } from 'react';
import { marked } from 'marked';

export const RuleBook: React.FC = () => {
    const [rulesContent, setRulesContent] = useState<string>('');

    useEffect(() => {
        fetch('./Rules.md')
            .then((response) => response.text())
            .then((text) => {
                const parsedContent = marked.parse(text) as string;
                setRulesContent(parsedContent);
            })
            .catch((error) => console.error('Error fetching Rules.md:', error));
    }, []);

    return (
        <div className="RuleBook">
            <div
                className="rules-content"
                dangerouslySetInnerHTML={{ __html: rulesContent }}
            />
        </div>
    );
};
