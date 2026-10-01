import Section from '../ui/Section';
import * as LucideIcons from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { useTranslation } from '../../hooks/useTranslation';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Link } from 'react-router-dom';

import { governmentCategories } from '../../data/yamlLoader';

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  category: string;
  slug: string;
  subcategories: Subcategory[];
  description: string;
  icon: string;
}

interface GovernmentActivitySectionProps {
  title?: string;
  description?: string;
  limit?: number;
  showViewAll?: boolean;
}

export default function GovernmentActivitySection({
  title,
  description,
  limit,
  showViewAll = true,
}: GovernmentActivitySectionProps = {}) {
  const { t } = useTranslation();

  const getIcon = (category: string) => {
    const IconComponent = LucideIcons[
      category as keyof typeof LucideIcons
    ] as React.ComponentType<{ className?: string }>;
    return IconComponent ? <IconComponent className="h-6 w-6" /> : null;
  };

  const allCategories = governmentCategories.categories as Category[];
  const displayedCategories = limit
    ? allCategories.slice(0, limit)
    : allCategories;

  return (
    <Section id="#government" className="!bg-gray-50">
      <Heading level={2}>{title || t('governmentActivity.title')}</Heading>
      <Text className="text-gray-600 mb-6">
        {description || t('governmentActivity.description')}
      </Text>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedCategories.map(category => (
          <Card
            key={category.slug}
            hoverable
            className="border-t-4 border-primary-500"
          >
            <Link
              to={`/government/${category.slug}`}
              className="mt-auto text-primary-600 hover:text-primary-700 font-medium transition-colors inline-flex items-center"
            >
              <CardContent className="flex flex-col h-full p-6">
                <div className="flex gap-2">
                  <div className="bg-primary-100 text-primary-600 p-3 rounded-md mb-4 self-start">
                    {getIcon(category.icon)}
                  </div>

                  <h3 className="text-lg font-semibold mb-4 text-gray-900 self-center">
                    {category.category}
                  </h3>
                </div>
                <Text className="text-gray-800">{category.description}</Text>
              </CardContent>
            </Link>
          </Card>
        ))}
        {showViewAll && (
          <Card hoverable className="border-t-4 border-primary-500">
            <Link
              to="/government/departments"
              className="mt-auto text-primary-600 hover:text-primary-700 font-medium transition-colors inline-flex items-center"
            >
              <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="bg-primary-100 text-primary-600 p-3 rounded-md mb-4">
                  <ArrowRight className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('governmentActivity.viewAllCard')}
                </h3>
              </CardContent>
            </Link>
          </Card>
        )}
      </div>
    </Section>
  );
}
