import styled from 'styled-components';

const SelectorContainer = styled.div`
`;

const SelectLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const QuerySelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const QueryDescription = styled.p`
  margin-top: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.secondary};
`;

const QuerySelector = ({ presetQueries, selectedPreset, onSelect }) => {
  return (
    <SelectorContainer>
      <SelectLabel htmlFor="preset-query">Select a preset query:</SelectLabel>
      <QuerySelect 
        id="preset-query"
        value={selectedPreset}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        {presetQueries.map((preset, index) => (
          <option key={preset.id} value={index}>
            {preset.name}
          </option>
        ))}
      </QuerySelect>
      <QueryDescription>
        {presetQueries[selectedPreset].description}
      </QueryDescription>
    </SelectorContainer>
  );
};

export default QuerySelector;
