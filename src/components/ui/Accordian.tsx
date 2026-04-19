import React, { useState } from 'react';
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/classmerger.ts";

export type AccordionVariant = 'bordered' | 'flush' | 'filled' | 'card';

interface AccordionItemData {
    title: string;
    content: React.ReactNode;
}

interface AccordionProps {
    items: AccordionItemData[];
    defaultOpen?: number | number[] | null;
    variant?: AccordionVariant;
    multiple?: boolean;
}

interface AccordionItemProps {
    title: string;
    content: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
    variant: AccordionVariant;
    isFirst: boolean;
    isLast: boolean;
}

{/**Added comment to add change to git */}

const wrapperStyles: Record<AccordionVariant, (isFirst: boolean, isLast: boolean) => string> = {
    bordered: () => 'border border-borderColor rounded-lg overflow-hidden',
    flush: (isFirst, ) =>
        cn(
            'border-borderColor overflow-hidden',
            isFirst ? 'border-t' : '',
            'border-b',
        ),
    filled: () => 'rounded-lg overflow-hidden',
    card: () => 'rounded-xl overflow-hidden shadow-md bg-bodyBackgroundColor',
};

const buttonStyles: Record<AccordionVariant, (isOpen: boolean) => string> = {
    bordered: () =>
        'w-full px-6 py-4 flex items-center justify-between bg-bodyBackgroundColor transition-colors hover:bg-gray-50 dark:hover:bg-white/5',
    flush: () =>
        'w-full px-0 py-4 flex items-center justify-between bg-transparent transition-colors hover:opacity-75',
    filled: (isOpen) =>
        cn(
            'w-full px-6 py-4 flex items-center justify-between transition-colors',
            isOpen
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-bodyTextColor',
        ),
    card: () =>
        'w-full px-6 py-4 flex items-center justify-between bg-bodyBackgroundColor transition-colors hover:bg-gray-50 dark:hover:bg-white/5',
};

const titleStyles: Record<AccordionVariant, (isOpen: boolean) => string> = {
    bordered: () => 'font-medium text-left text-bodyTextColor',
    flush: () => 'font-medium text-left text-bodyTextColor',
    filled: (isOpen) =>
        cn(
            'font-medium text-left transition-colors',
            isOpen ? 'text-white dark:text-gray-900' : 'text-bodyTextColor',
        ),
    card: () => 'font-medium text-left text-bodyTextColor',
};

const chevronStyles: Record<AccordionVariant, (isOpen: boolean) => string> = {
    bordered: (isOpen) => cn('w-5 h-5 text-gray-400 transition-transform duration-200', isOpen && 'rotate-180'),
    flush: (isOpen) => cn('w-5 h-5 text-gray-400 transition-transform duration-200', isOpen && 'rotate-180'),
    filled: (isOpen) =>
        cn(
            'w-5 h-5 transition-transform duration-200',
            isOpen ? 'text-white dark:text-gray-900 rotate-180' : 'text-gray-400',
        ),
    card: (isOpen) => cn('w-5 h-5 text-gray-400 transition-transform duration-200', isOpen && 'rotate-180'),
};

const bodyStyles: Record<AccordionVariant, string> = {
    bordered: 'px-6 py-4 bg-bodyBackgroundColor text-bodyTextColor overflow-y-auto max-h-96',
    flush: 'px-0 py-4 bg-transparent text-bodyTextColor overflow-y-auto max-h-96',
    filled: 'px-6 py-4 bg-gray-50 dark:bg-white/5 text-bodyTextColor overflow-y-auto max-h-96',
    card: 'px-6 py-4 bg-bodyBackgroundColor text-bodyTextColor overflow-y-auto max-h-96 border-t border-borderColor',
};

const AccordionItem: React.FC<AccordionItemProps> = ({
                                                         title,
                                                         content,
                                                         isOpen,
                                                         onToggle,
                                                         variant,
                                                         isFirst,
                                                         isLast,
                                                     }) => {
    const renderContent = () => {
        if (React.isValidElement(content)) return content;
        if (typeof content === 'function') {
            const C = content as React.ComponentType;
            return <C />;
        }
        return content;
    };

    return (
        <div className={wrapperStyles[variant](isFirst, isLast)}>
            <button
                onClick={onToggle}
                aria-expanded={isOpen}
                className={buttonStyles[variant](isOpen)}
            >
                <span className={titleStyles[variant](isOpen)}>{title}</span>
                <ChevronDown className={chevronStyles[variant](isOpen)} />
            </button>

            <div
                className={cn(
                    'transition-all duration-200 ease-in-out overflow-hidden',
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
                )}
            >
                <div className={bodyStyles[variant]}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};


export const Accordion: React.FC<AccordionProps> = ({
                                                        items,
                                                        defaultOpen = null,
                                                        variant = 'bordered',
                                                        multiple = false,
                                                    }) => {
    const initialOpen = (): Set<number> => {
        if (defaultOpen === null || defaultOpen === undefined) return new Set();
        if (Array.isArray(defaultOpen)) return new Set(defaultOpen);
        return new Set([defaultOpen]);
    };

    const [openIndexes, setOpenIndexes] = useState<Set<number>>(initialOpen);

    const toggleItem = (index: number) => {
        setOpenIndexes(prev => {
            const next = new Set(prev);
            if (next.has(index)) {
                next.delete(index);
            } else {
                if (!multiple) next.clear();
                next.add(index);
            }
            return next;
        });
    };

    const containerClass = cn(
        'w-full max-w-2xl mx-auto',
        variant === 'flush' ? 'space-y-0' : 'space-y-2',
    );

    return (
        <div className={containerClass}>
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isOpen={openIndexes.has(index)}
                    onToggle={() => toggleItem(index)}
                    variant={variant}
                    isFirst={index === 0}
                    isLast={index === items.length - 1}
                />
            ))}
        </div>
    );
};

export { Accordion as Accordian };