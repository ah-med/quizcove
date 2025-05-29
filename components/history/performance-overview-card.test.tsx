import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PerformanceOverviewCard } from './performance-overview-card'

describe('PerformanceOverviewCard', () => {
    const mockData = {
        totalQuizzes: 10,
        averageScore: 75,
        totalTimeSpent: 3600,
        mostAttemptedTopic: 'JavaScript'
    }

    it('renders all required metrics', () => {
        const { rerender } = render(<PerformanceOverviewCard {...mockData} />)

        expect(screen.getByText('Total Quizzes')).toBeDefined()
        expect(screen.getByText('10')).toBeDefined()

        expect(screen.getByText('Average Score')).toBeDefined()
        expect(screen.getByText('75%')).toBeDefined()

        expect(screen.getByText('Total Time Spent')).toBeDefined()
        expect(screen.getByText('1h 0m 0s')).toBeDefined()

        expect(screen.getByText('Most Attempted Topic')).toBeDefined()
        expect(screen.getByText('JavaScript')).toBeDefined()
        rerender(<></>)
    })

    it('handles zero values correctly', () => {
        const zeroData = {
            totalQuizzes: 0,
            averageScore: 0,
            totalTimeSpent: 0,
            mostAttemptedTopic: ''
        }

        render(<PerformanceOverviewCard {...zeroData} />)

        expect(screen.getByText('0')).toBeDefined()
        expect(screen.getByText('0%')).toBeDefined()
        expect(screen.getByText('0h 0m 0s')).toBeDefined()
        expect(screen.getByText('None')).toBeDefined()
    })

    it('formats time correctly for different durations', () => {
        const timeTestCases = [
            { seconds: 45, expected: '0h 0m 45s' },
            { seconds: 3600, expected: '1h 0m 0s' },
            { seconds: 3665, expected: '1h 1m 5s' },
            { seconds: 7200, expected: '2h 0m 0s' }
        ]

        timeTestCases.forEach(({ seconds, expected }) => {
            render(
                <PerformanceOverviewCard
                    {...mockData}
                    totalTimeSpent={seconds}
                />
            )
            expect(screen.getByText(expected)).toBeDefined()
        })
    })

    it('applies correct styling classes', () => {
        render(<PerformanceOverviewCard {...mockData} />)

        const metricItems = screen.getAllByTestId('metric-item')
        metricItems.forEach(item => {
            expect(item.className).toContain('flex')
            expect(item.className).toContain('flex-col')
            expect(item.className).toContain('items-center')
            expect(item.className).toContain('p-4')
        })
    })
})
