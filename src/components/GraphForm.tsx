'use client';

import React, { useCallback } from 'react';
import { AddIcon } from '@/assets/icons/AddIcon';
import { RemoveIcon } from '@/assets/icons/RemoveIcon';
import { useFieldArray } from 'react-hook-form';
import { useGraphForm } from '@/hooks';
import { Button, Input, Select, Card, ErrorMessage } from '@/components/ui';
import type { SelectOption } from '@/components/ui';
import type { CreateGraphFormData } from '@/types/graph';

/**
 * GraphForm component props
 */
interface GraphFormProps {
  /** Callback executed when graph is successfully created */
  onGraphCreated: (graphId: string) => void;
}

/**
 * Available strategy options for similarity calculation
 */
const STRATEGY_OPTIONS: SelectOption[] = [
  { value: 'keyword_jaccard', label: 'Keyword Jaccard' },
  { value: 'semantic', label: 'Semantic Similarity' },
];

/**
 * GraphForm Component - Form for creating knowledge graphs
 */
export const GraphForm: React.FC<GraphFormProps> = ({ onGraphCreated }) => {
  const { form, onSubmit, isLoading, error } = useGraphForm();
  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;

  // useFieldArray for dynamic topics management (without generic typing to avoid conflicts)
  const { fields, append, remove } = useFieldArray({
    control: control as any,
    name: 'topics',
  });

  /**
   * Handler to add a new empty topic
   */
  const handleAddTopic = useCallback(() => {
    append('');
  }, [append]);

  /**
   * Handler to remove a topic by index
   */
  const handleRemoveTopic = useCallback((index: number) => {
    // Keep minimum 2 topics
    if (fields.length > 2) {
      remove(index);
    }
  }, [fields.length, remove]);

  /**
   * Form submit handler
   * Optimized with useCallback to avoid re-renders
   */
  const handleFormSubmit = useCallback(
    async (data: CreateGraphFormData) => {
      try {
        const result = await onSubmit(data);
        onGraphCreated(result.graphId);
      } catch (err) {
        // Error handled by React Query
        console.error('Error creating graph:', err);
      }
    },
    [onSubmit, onGraphCreated]
  );

  return (
    <Card
      title="Create Graph"
      description="Enter topics to generate a knowledge graph"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Graph Name */}
        <Input
          label="Graph Name"
          placeholder="e.g., AI and Technology Graph"
          {...register('name')}
          error={errors.name?.message}
          disabled={isLoading}
        />

        {/* Dynamic Topics */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topics
            <span className="text-gray-500 text-xs ml-1">
              (minimum 2, maximum 20)
            </span>
          </label>

          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder={`Topic ${index + 1}`}
                    {...register(`topics.${index}` as const)}
                    error={errors.topics?.[index]?.message}
                    disabled={isLoading}
                    fullWidth
                  />
                </div>

                {/* Remove button (only if more than 2) */}
                {fields.length > 2 && (
                  <Button
                    type="button"
                    variant="danger"
                    size="md"
                    onClick={() => handleRemoveTopic(index)}
                    disabled={isLoading}
                    className="shrink-0"
                    aria-label={`Remove topic ${index + 1}`}
                  >
                    <RemoveIcon className="h-5 w-5" />
                  </Button>
                )}
              </div>
            ))}

            {/* General topics array error */}
            {errors.topics && typeof errors.topics.message === 'string' && (
              <p className="text-sm text-red-600" role="alert">
                {errors.topics.message}
              </p>
            )}
          </div>

          {/* Add topic button */}
          {fields.length < 20 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddTopic}
              disabled={isLoading}
              className="mt-2"
            >
              <AddIcon className="h-4 w-4 mr-1" />
              Add Topic
            </Button>
          )}
        </div>

        {/* Similarity Strategy */}
        <Select
          label="Similarity Strategy"
          options={STRATEGY_OPTIONS}
          {...register('strategy')}
          error={errors.strategy?.message}
          disabled={isLoading}
        />

        {/* Threshold */}
        <Input
          label="Threshold"
          type="number"
          step="0.01"
          min="0"
          max="1"
          placeholder="0.1"
          helperText="Similarity threshold (0.0 - 1.0)"
          {...register('threshold', { valueAsNumber: true })}
          error={errors.threshold?.message}
          disabled={isLoading}
        />

        {/* Mutation Error */}
        {error && (
          <ErrorMessage
            title="Error creating graph"
            message={error.message || 'An unexpected error occurred'}
            centered={false}
          />
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Graph...' : 'Create Graph'}
        </Button>
      </form>
    </Card>
  );
};
